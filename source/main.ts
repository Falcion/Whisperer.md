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

    this.apply()
  }

  async onunload(): Promise<void> {
    super.onunload()

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
    })

    for (const playerData of this.fileAmbiencePlayers.values()) {
      playerData.player.remove()
    }
  }

  public apply(): void {
    if (this.settings.vault_ambience) this.playerPerGlobal.playAmbience()
  }
}
