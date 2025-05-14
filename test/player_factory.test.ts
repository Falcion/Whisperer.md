/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-env browser, jest */
import PlayerFactory from './../source/player/factory/player_factory'
import Whisperer from './../source/main'

describe('Factory › PlayerFactory', () => {
  let plugin: Whisperer, container: HTMLElement
  let factory: PlayerFactory

  beforeEach(() => {
    container = document.createElement('div')
    plugin = new Whisperer({} as any, {} as any)
    plugin.settings.vault_ambience_path = 'https://youtu.be/ABCDEF12345'
    plugin.settings.music_volume = 30
    // stub local resource path
    plugin.app = { vault: { adapter: { getResourcePath: (p: string) => '/res/' + p } } } as any
    factory = new PlayerFactory(plugin)
  })

  it('creates YouTube iframe', () => {
    factory.createPlayer(container, 'youtube')
    const iframe = container.querySelector('iframe')!
    expect(iframe.src).toContain('embed/ABCDEF12345')
    expect(iframe.allow).toBe('autoplay')
  })

  it('creates SoundCloud iframe', () => {
    plugin.settings.vault_ambience_path = 'https://soundcloud.com/x/y'
    factory.createPlayer(container, 'sc')
    const iframe = container.querySelector('iframe')!
    expect(iframe.src).toContain('w.soundcloud.com/player')
  })

  it('creates local audio element', () => {
    factory.createPlayer(container, 'local')
    const audio = container.querySelector('audio')!
    expect(audio.src).toContain('/res/' + plugin.settings.vault_ambience_path)
    expect(audio.volume).toBeCloseTo(0.3)
  })

  it('throws on unknown type', () => {
    expect(() => factory.createPlayer(container, 'unknown')).toThrow()
  })
})
