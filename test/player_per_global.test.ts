/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-env browser, jest */
import PlayerPerGlobal from 'source/player/player_per_global'
import Whisperer from 'source/main'

describe('PlayerPerGlobal', () => {
    let plugin: Whisperer

    beforeEach(() => {
        document.body.innerHTML = '<div class="obsidian-app"></div>'
        plugin = new Whisperer({} as any, {} as any)
        plugin.settings.vault_ambience = true
        plugin.settings.vault_ambience_path = 'https://youtu.be/ZZZZZ123456'
        // stub local fallback
        plugin.app.vault = { adapter: { getResourcePath: (p: string) => '/m/' + p } } as any
    })

    it('appends vault ambience player', () => {
        new PlayerPerGlobal(plugin).playAmbience()
        const nodes = document.querySelectorAll('.vault-ambience-player')
        expect(nodes.length).toBe(1)
        expect(plugin.players).toContainEqual(nodes[0] as HTMLElement)
    })

    it('does not duplicate when file ambience exists', () => {
        document.querySelector('.obsidian-app')!.innerHTML =
            '<div class="file-ambience-player"></div>'
        new PlayerPerGlobal(plugin).playAmbience()
        expect(document.querySelectorAll('.vault-ambience-player').length).toBe(0)
    })
})
