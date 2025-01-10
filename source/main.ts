/*
 * MIT License
 *
 * Copyright (c) 2023-2025 Falcion
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Any code and/or API associated with OBSIDIAN behaves as stated in their distribution policy.
 */

import { Plugin, TFile } from 'obsidian'

import WhispererSettingsTab, { DEFAULT_SETTINGS, WHISPERER_SETTINGS } from './settings'

export default class Whisperer extends Plugin {
    private _settings: WHISPERER_SETTINGS = DEFAULT_SETTINGS;
    private _players: HTMLElement[] = [];
    private _fileAmbiencePlayers: Map<string, { player: HTMLElement; position: number }> = new Map();
    private _activeFile: string | null = null;

    public get settings(): WHISPERER_SETTINGS {
        return this._settings
    }

    public get players(): HTMLElement[] {
        return this._players
    }

    async onload(): Promise<void> {
        super.onload()

        await this.loadSettings()

        this.addSettingTab(new WhispererSettingsTab(this.app, this))
        this.registerEvent(this.app.workspace.on('file-open', this.handleFileOpen.bind(this))); // Listen for file open

        this.apply()
    }

    async onunload(): Promise<void> {
        super.onunload()

        this.unapply();
    }

    async loadSettings(): Promise<void> {
        this._settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
    }

    async updateSettings(settings: WHISPERER_SETTINGS): Promise<void> {
        this.unapply()

        this._settings = settings

        await this.saveData(this.settings)

        this.apply()
    }

    async updateVolumeSettings(settings: WHISPERER_SETTINGS): Promise<void> {
        if (this.players.length === 0) {
            this.updateSettings(settings)
        } else {
            this._settings = settings

            await this.saveData(this.settings)

            // Apply new volume settings to each active player
            this.players.forEach((player) => {
                if (player.tagName === 'IFRAME') {
                    const iframe = player as HTMLIFrameElement

                    // Handle YouTube player
                    if (iframe.src.includes('youtube.com') || iframe.src.includes('youtu.be')) {
                        iframe.contentWindow?.postMessage(
                            JSON.stringify({
                                event: 'command',
                                func: 'setVolume',
                                args: [this.settings.music_volume]
                            }),
                            '*'
                        )
                    }

                    // Handle SoundCloud player
                    if (iframe.src.includes('soundcloud.com')) {
                        // SoundCloud iframe API supports message listeners for certain features
                        iframe.contentWindow?.postMessage(
                            JSON.stringify({
                                method: 'setVolume',
                                value: this.settings.music_volume / 100
                            }),
                            '*'
                        )
                    }
                } else if (player.tagName === 'AUDIO') {
                    // Handle local audio player
                    const audio = player as HTMLAudioElement
                    audio.volume = (this.settings.music_volume || 50) / 100
                }
            })
        }
    }

    public unapply(): void {
        this.players.forEach((player) => {
            player.remove()
        });

        for (const playerData of this._fileAmbiencePlayers.values()) {
            playerData.player.remove();
        }
    }

    public apply(): void {
        if (this.settings.vault_ambience) this.playAmbience()
    }

    public playAmbience(): void {
        const container = document.getElementsByClassName('obsidian-app')[0]

        if (!container) return

        let player = container.querySelector('.vault-ambience-player') as HTMLElement | null

        if (player) player.remove()

        if (container.getElementsByClassName('file-ambience-player').length > 0) return;

        player = document.createElement('div')
        player.className = 'vault-ambience-player'

        if (this.isUrl(this.settings.vault_ambience_path)) {
            if (
                this.settings.vault_ambience_path.includes('youtube.com') ||
                this.settings.vault_ambience_path.includes('youtu.be')
            ) {
                this.setupYouTubePlayer(player)
            } else if (this.settings.vault_ambience_path.includes('soundcloud.com')) {
                this.setupSoundCloudPlayer(player)
            }
        } else {
            this.setupLocalAudioPlayer(player)
        }

        container.appendChild(player)

        this._players.push(player)
    }

    private setupYouTubePlayer(player: HTMLElement): void {
        const videoId = this.extractId(this.settings.vault_ambience_path)
        const iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`
        iframe.width = '300'
        iframe.height = '166'
        iframe.frameBorder = '0'
        iframe.allow = 'autoplay'
        iframe.allowFullscreen = true

        // Volume handled via postMessage to YouTube API
        iframe.onload = () => {
            const volume = this.settings.music_volume || 50 // Default volume
            iframe.contentWindow?.postMessage(
                JSON.stringify({
                    event: 'command',
                    func: 'setVolume',
                    args: [volume]
                }),
                '*'
            )
        }

        player.appendChild(iframe)
    }

    private setupSoundCloudPlayer(player: HTMLElement): void {
        const embedUrl = this.getEmbedUrl(this.settings.vault_ambience_path)
        const iframe = document.createElement('iframe')
        iframe.src = embedUrl
        iframe.width = '300'
        iframe.height = '166'
        iframe.allow = 'autoplay'
        iframe.frameBorder = '0'

        // Volume adjustment is not directly supported by SoundCloud embedded players.

        player.appendChild(iframe)
    }

    private setupLocalAudioPlayer(player: HTMLElement): void {
        const audio = document.createElement('audio')
        audio.src = this.app.vault.adapter.getResourcePath(this.settings.vault_ambience_path)
        audio.controls = true
        audio.autoplay = true
        audio.loop = true
        audio.volume = (this.settings.music_volume || 50) / 100 // Set initial volume

        player.appendChild(audio)
    }

    public isUrl(str: string): boolean {
        return /^(https?:\/\/)/.test(str)
    }

    public getEmbedUrl(url: string): string {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('youtu.be')
                ? url.split('/').pop()
                : new URL(url).searchParams.get('v')
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&start=0`
        } else if (url.includes('soundcloud.com')) {
            return `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&auto_play=true`
        }
        throw new Error('Unsupported URL type.')
    }

    public extractId(url: string): string {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|.*v=))([\w-]{11})/)

        return match ? match[1] : ''
    }

    //#region Working with meta files
    async handleFileOpen(file: TFile | null): Promise<void> {
        if (!file) return

        if (!this.settings.ambience_per_files) return;

        const fileCache = this.app.metadataCache.getFileCache(file)
        const musicPath = fileCache?.frontmatter?.music

        if (musicPath) {
            // Pause vault-wide ambience if active
            this.pauseVaultAmbience();

            // Pause existing file-specific ambience
            if (this._activeFile) {
                this.pauseFileAmbience(this._activeFile)
            }

            // Set and play new file-specific ambience
            this._activeFile = file.path
            this.playFileAmbience(musicPath, file.path)
        } else {
            // Pause existing file-specific ambience
            if (this._activeFile) {
                this.pauseFileAmbience(this._activeFile)
            }

            if (!document.getElementsByClassName('obsidian-app')[0].querySelector('.vault-ambience-player')) {
                if (this.settings.vault_ambience)
                    this.playAmbience();
            }
        }
    }

    playFileAmbience(musicPath: string, filePath: string): void {
        const container = document.getElementsByClassName('obsidian-app')[0]
        if (!container) return

        // Create new player
        const player = document.createElement('div')
        player.className = 'file-ambience-player'

        if (this.isUrl(musicPath)) {
            // Handle YouTube or SoundCloud URLs
            if (musicPath.includes('youtube.com') || musicPath.includes('youtu.be')) {
                const videoId = this.extractId(musicPath)
                const iframe = document.createElement('iframe')
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`
                iframe.width = '300'
                iframe.height = '166'
                iframe.frameBorder = '0'
                iframe.allow = 'autoplay'
                iframe.addClass('hidden-frame');
                player.appendChild(iframe)
            } else if (musicPath.includes('soundcloud.com')) {
                const embedUrl = this.getEmbedUrl(musicPath)
                const iframe = document.createElement('iframe')
                iframe.src = embedUrl
                iframe.width = '300'
                iframe.height = '166'
                iframe.allow = 'autoplay'
                iframe.frameBorder = '0'
                iframe.addClass('hidden-frame');
                player.appendChild(iframe)
            }
        } else {
            // Handle local files
            const audio = document.createElement('audio')
            audio.src = this.app.vault.adapter.getResourcePath(musicPath)
            audio.controls = true
            audio.autoplay = true
            audio.loop = true
            audio.volume = (this.settings.music_volume || 50) / 100
            player.appendChild(audio)

            audio.addEventListener('timeupdate', () => {
                const playbackData = this._fileAmbiencePlayers.get(filePath)
                if (playbackData) {
                    playbackData.position = audio.currentTime
                }
            })
        }

        container.appendChild(player)
        this._fileAmbiencePlayers.set(filePath, { player, position: 0 })
    }

    pauseFileAmbience(filePath: string): void {
        const playbackData = this._fileAmbiencePlayers.get(filePath)
        if (!playbackData) return

        const { player } = playbackData

        // Handle HTMLAudioElement
        if (player instanceof HTMLAudioElement) {
            playbackData.position = player.currentTime
            player.pause()
        }
        // Handle IFrame for YouTube and SoundCloud
        else if (player instanceof HTMLIFrameElement) {
            if (player.src.includes('youtube.com') || player.src.includes('youtu.be')) {
                player.contentWindow?.postMessage(
                    JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
                    '*'
                )
            } else if (player.src.includes('soundcloud.com')) {
                player.contentWindow?.postMessage(JSON.stringify({ method: 'pause' }), '*')
            }
        }

        player.remove();
        this._fileAmbiencePlayers.delete(filePath);
    }

    pauseVaultAmbience(): void {
        this.unapply();
    }
    //#endregion
}
