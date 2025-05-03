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

import WhispererSettingsTab from './settings'
import { WHISPERER_SETTINGS, DEFAULT_SETTINGS } from './settings/settings'
import PlayerPerFile from './player/player_per_file'
import PlayerPerGlobal from './player/player_per_global'

export default class Whisperer extends Plugin {
  private _settings: WHISPERER_SETTINGS = DEFAULT_SETTINGS

  public players: HTMLElement[] = []
  public fileAmbiencePlayers: Map<string, { player: HTMLElement; position: number }> = new Map()
  public activeFile: string | null = null

  public playerPerFile: PlayerPerFile = new PlayerPerFile(this)
  public playerPerGlobal: PlayerPerGlobal = new PlayerPerGlobal(this)

  public get settings(): WHISPERER_SETTINGS {
    return this._settings
  }

  async onload(): Promise<void> {
    super.onload()

    await this.loadSettings()

    this.addSettingTab(new WhispererSettingsTab(this.app, this))
    this.registerEvent(
      this.app.workspace.on('file-open', this.playerPerFile.handleFileOpen.bind(this))
    ) // Listen for file open

    const container = document.getElementsByClassName('obsidian-app')[0]

    if (container) {
      const script = document.createElement('script')

      script.src = 'https://w.soundcloud.com/player/api.js'
      script.id = 'whisperer-md-sc-widget'

      container.appendChild(script)
    }

    this.apply()
  }

  async onunload(): Promise<void> {
    super.onunload()

    const script = document.getElementById('whisperer-md-sc-widget') as HTMLScriptElement | null

    if (script) {
      script.src = ''
      script.remove()
    }

    this.unapply()
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
          try {
            const url = new URL(iframe.src);
            const allowedYouTubeHosts = ['youtube.com', 'www.youtube.com', 'youtu.be'];
            if (allowedYouTubeHosts.includes(url.hostname)) {
              iframe.contentWindow?.postMessage(
                JSON.stringify({
                  event: 'command',
                  func: 'setVolume',
                  args: [this.settings.music_volume]
                }),
                '*'
              );
            }
          } catch (e) {
            console.error('Invalid iframe src URL:', iframe.src);
          }

          // Handle SoundCloud player
          try {
            const url = new URL(iframe.src);
            const allowedSoundCloudHosts = ['soundcloud.com', 'w.soundcloud.com'];
            if (allowedSoundCloudHosts.includes(url.hostname)) {
              // SoundCloud iframe API supports message listeners for certain features
              iframe.contentWindow?.postMessage(
                JSON.stringify({
                  method: 'setVolume',
                  value: this.settings.music_volume / 100
                }),
                'https://w.soundcloud.com'
              );
            }
          } catch (e) {
            console.error('Invalid iframe src URL:', iframe.src);
          }
        } else if (player.tagName === 'AUDIO') {
          // Handle local audio player
          const audio = player as HTMLAudioElement
          audio.volume = (this.settings.music_volume || 50) / 100
        }
      })
    }
  }

  async updateVisibleSettings(settings: WHISPERER_SETTINGS): Promise<void> {
    if (this.players.length === 0) {
      this.updateSettings(settings)
    } else {
      this._settings = settings

      await this.saveData(this.settings)

      this.players.forEach((player) => {
        player.removeClass(this.settings.debug_frames ? 'hidden-frame' : 'visible')
        player.addClass(this.settings.debug_frames ? 'visible' : 'hidden-frame')
      })
    }
  }

  public unapply(): void {
    this.players.forEach((player) => {
      player.remove()
      const iframe = player.querySelector('iframe')
      if (iframe) {
        iframe.src = '' // Prevent memory leaks
      }
    })

    this.players = []

    for (const playerData of this.fileAmbiencePlayers.values()) {
      playerData.player.remove()
    }
  }

  public apply(): void {
    if (this.settings.vault_ambience) this.playerPerGlobal.playAmbience()
  }
}
