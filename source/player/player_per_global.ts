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

    if (isUrl(this.plugin.settings.vault_ambience_path)) {
      if (
        this.plugin.settings.vault_ambience_path.includes('youtube.com') ||
        this.plugin.settings.vault_ambience_path.includes('youtu.be')
      ) {
        PlayerFactory.createPlayer(this.plugin, player, 'yt')
      } else if (this.plugin.settings.vault_ambience_path.includes('soundcloud.com')) {
        PlayerFactory.createPlayer(this.plugin, player, 'sc')
      }
    } else {
      PlayerFactory.createPlayer(this.plugin, player, 'local')
    }

    container.appendChild(player)

    this.plugin.players.push(player)
  }
}
