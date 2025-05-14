import { TFile } from 'obsidian'
import Whisperer from './../main'
import { extractId, getEmbedUrl, isAllowedHost, isEmptyString, isUrl } from './../utils/functions'
import { SC_HOSTS, YT_HOSTS } from './../utils/constants'

export default class PlayerPerFile {
  public plugin: Whisperer

  constructor (_plugin: Whisperer) {
    this.plugin = _plugin
  }

  async handleFileOpen (file: TFile | null): Promise<void> {
    if (file == null) return

    if (!this.plugin.settings.ambience_per_files) return

    const fileCache = this.plugin.app.metadataCache.getFileCache(file)
    const musicPath = fileCache?.frontmatter?.music

    const { activeFile } = this.plugin

    if (typeof musicPath === 'string' && musicPath !== '') {
      // Pause vault-wide ambience if active
      this.pauseVaultAmbience()

      // Pause existing file-specific ambience
      if (!isEmptyString(activeFile)) {
        this.pauseFileAmbience(activeFile ?? '')
      }

      // Set and play new file-specific ambience
      this.plugin.activeFile = file.path
      this.playFileAmbience(musicPath, file.path)
    } else {
      // Pause existing file-specific ambience (only if a non-empty path is set)
      if (!isEmptyString(activeFile)) {
        this.pauseFileAmbience(activeFile ?? '')
      }

      if (
        document
          .getElementsByClassName('obsidian-app')[0]
          .querySelector('.vault-ambience-player') == null
      ) {
        if (this.plugin.settings.vault_ambience) this.plugin.playerPerGlobal.playAmbience()
      }
    }
  }

  playFileAmbience (musicPath: string, filePath: string): void {
    const container = document.getElementsByClassName('obsidian-app')[0]

    // Create new player
    const player = document.createElement('div')
    player.className = 'file-ambience-player'

    if (isUrl(musicPath)) {
      // Handle YouTube or SoundCloud URLs
      if (isAllowedHost(musicPath, YT_HOSTS)) {
        const videoId = extractId(musicPath)
        const iframe = document.createElement('iframe')
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}`
        iframe.width = '300'
        iframe.height = '166'
        iframe.allow = 'autoplay'
        iframe.addClass(this.plugin.settings.debug_frames ? 'visible' : 'hidden-frame')
        player.appendChild(iframe)
      } else {
        try {
          if (isAllowedHost(musicPath, SC_HOSTS)) {
            const embedUrl = getEmbedUrl(musicPath)
            const iframe = document.createElement('iframe')
            iframe.src = embedUrl
            iframe.width = '300'
            iframe.height = '166'
            iframe.allow = 'autoplay'
            iframe.addClass(this.plugin.settings.debug_frames ? 'visible' : 'hidden-frame')
            player.appendChild(iframe)
          }
        } catch (e) {
          console.error('Invalid URL:', musicPath, e)
        }
      }
    } else {
      // Handle local files
      const audio = document.createElement('audio')
      audio.src = this.plugin.app.vault.adapter.getResourcePath(musicPath)
      audio.controls = true
      audio.autoplay = true
      audio.loop = true
      audio.volume = (this.plugin.settings.music_volume ?? 50) / 100
      player.appendChild(audio)

      audio.addEventListener('timeupdate', () => {
        const playbackData = this.plugin.fileAmbiencePlayers.get(filePath)
        if (playbackData !== undefined) {
          playbackData.position = audio.currentTime
        }
      })
    }

    container.appendChild(player)
    this.plugin.fileAmbiencePlayers.set(filePath, { player, position: 0 })
  }

  pauseFileAmbience (filePath: string): void {
    const playbackData = this.plugin.fileAmbiencePlayers.get(filePath)

    if (playbackData === undefined) return

    if (isEmptyString(filePath)) throw new Error('Got empty file path, unexpected behavior.')

    const { player } = playbackData

    // Handle HTMLAudioElement
    if (player instanceof HTMLAudioElement) {
      playbackData.position = player.currentTime

      player.pause()
      // Handle IFrame for YouTube and SoundCloud
    } else if (player instanceof HTMLIFrameElement) {
      if (player.src.includes('youtube.com') || player.src.includes('youtu.be')) {
        player.contentWindow?.postMessage(
          JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
          '*'
        )
      } else {
        try {
          if (isAllowedHost(player.src, SC_HOSTS)) {
            player.contentWindow?.postMessage(JSON.stringify({ method: 'pause' }), '*')
          }
        } catch (e) {
          console.error('Invalid URL in player.src:', player.src, e)
        }
      }
    }

    player.remove()

    this.plugin.fileAmbiencePlayers.delete(filePath)
  }

  pauseVaultAmbience (): void {
    this.plugin.unapply()
  }
}
