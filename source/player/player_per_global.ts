import { SC_HOSTS, YT_HOSTS } from './../utils/constants'
import Whisperer from './../main'
import { isAllowedHost, isUrl } from './../utils/functions'
import PlayerFactory from './factory/player_factory'

export default class PlayerPerGlobal {
  public plugin: Whisperer

  constructor (_plugin: Whisperer) {
    this.plugin = _plugin
  }

  public playAmbience (): void {
    const container = document.getElementsByClassName('obsidian-app')[0]

    let player = container.querySelector('.vault-ambience-player')

    if (player != null) player.remove()

    if (container.getElementsByClassName('file-ambience-player').length > 0) return

    player = document.createElement('div')
    player.className = 'vault-ambience-player'
    player.addClass(this.plugin.settings.debug_frames ? 'visible' : 'hidden-frame')

    const playerFactory = new PlayerFactory(this.plugin)

    if (isUrl(this.plugin.settings.vault_ambience_path)) {
      if (isAllowedHost(this.plugin.settings.vault_ambience_path, YT_HOSTS)) {
        playerFactory.createPlayer(player as HTMLElement, 'yt')
      } else if (isAllowedHost(this.plugin.settings.vault_ambience_path, SC_HOSTS)) {
        playerFactory.createPlayer(player as HTMLElement, 'sc')
      }
    } else {
      playerFactory.createPlayer(player as HTMLElement, 'local')
    }

    container.appendChild(player)

    this.plugin.players.push(player as HTMLElement)
  }
}
