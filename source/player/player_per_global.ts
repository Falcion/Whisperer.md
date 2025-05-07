import Whisperer from 'source/main'
import { isUrl } from 'source/utils/functions'
import PlayerFactory from './factory/player_factory'

export default class PlayerPerGlobal {
  public plugin: Whisperer

  constructor(_plugin: Whisperer) {
    this.plugin = _plugin
  }

  public playAmbience(): void {
    const container = document.getElementsByClassName('obsidian-app')[0]

    if (!container) return

    let player = container.querySelector('.vault-ambience-player') as HTMLElement | null

    if (player) player.remove()

    if (container.getElementsByClassName('file-ambience-player').length > 0) return

    player = document.createElement('div')
    player.className = 'vault-ambience-player'
    player.addClass(this.plugin.settings.debug_frames ? 'visible' : 'hidden-frame')

    if (isUrl(this.plugin.settings.vault_ambience_path)) {
      const url = new URL(this.plugin.settings.vault_ambience_path);
      const allowedYouTubeHosts = ['youtube.com', 'youtu.be'];
      const allowedSoundCloudHosts = ['soundcloud.com'];

      if (allowedYouTubeHosts.includes(url.host)) {
        PlayerFactory.createPlayer(this.plugin, player, 'yt');
      } else if (allowedSoundCloudHosts.includes(url.host)) {
        PlayerFactory.createPlayer(this.plugin, player, 'sc');
      }
      PlayerFactory.createPlayer(this.plugin, player, 'local')
    }

    container.appendChild(player)

    this.plugin.players.push(player)
  }
}
