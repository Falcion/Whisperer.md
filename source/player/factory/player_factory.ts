import Whisperer from './../../main'
import { extractId, getEmbedUrl } from './../../utils/functions'

export default class PlayerFactory {
  public createPlayer (plugin: Whisperer, player: HTMLElement, type: string): void {
    switch (type) {
      case 'youtube':
      case 'yt':
      case 'ytube':
        this.setupYouTubePlayer(plugin, player)
        break
      case 'sc':
      case 'scloud':
      case 'soundcloud':
        this.setupSoundCloudPlayer(plugin, player)
        break
      case 'local':
      case 'audio':
      case 'fs':
        this.setupLocalAudioPlayer(plugin, player)
        break
      default:
        throw new Error('Got an unknown type of player!')
    }
  }

  private setupYouTubePlayer (plugin: Whisperer, player: HTMLElement): void {
    const videoId = extractId(plugin.settings.vault_ambience_path)
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&enablejsapi=1&playlist=${videoId}`
    iframe.width = '300'
    iframe.height = '166'
    iframe.allow = 'autoplay'
    iframe.allowFullscreen = true

    // Volume handled via postMessage to YouTube API
    iframe.onload = () => {
      const volume = plugin.settings.music_volume ?? 50
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

  private setupSoundCloudPlayer (plugin: Whisperer, player: HTMLElement): void {
    const embedUrl = getEmbedUrl(plugin.settings.vault_ambience_path)
    // Add visual parameter to support API
    const apiEnabledUrl = `${embedUrl}&visual=true&show_artwork=false`
    const iframe = document.createElement('iframe')
    iframe.src = apiEnabledUrl
    iframe.width = '300'
    iframe.height = '166'
    iframe.allow = 'autoplay'

    //! Volume adjustment is not directly supported by SoundCloud embedded players.

    player.appendChild(iframe)
  }

  private setupLocalAudioPlayer (plugin: Whisperer, player: HTMLElement): void {
    const audio = document.createElement('audio')
    audio.src = plugin.app.vault.adapter.getResourcePath(plugin.settings.vault_ambience_path)
    audio.controls = true
    audio.autoplay = true
    audio.loop = true
    audio.volume = (plugin.settings.music_volume ?? 50) / 100
    audio.addEventListener('volumechange', () => {
      plugin.settings.music_volume = audio.volume * 100
      plugin
        .saveData(plugin.settings)
        .then()
        .catch((error) => {
          console.error(error)
        })
    })

    player.appendChild(audio)
  }
}
