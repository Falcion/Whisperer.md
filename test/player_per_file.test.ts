/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-env browser, jest */
import PlayerPerFile from './../source/player/player_per_file'
import Whisperer from './../source/main'
import { TFile } from 'obsidian'

describe('PlayerPerFile', () => {
  let plugin: Whisperer, handler: PlayerPerFile

  beforeEach(() => {
    document.body.innerHTML = '<div class="obsidian-app"></div>'

    const fakeApp = {
      metadataCache: {
        getFileCache: jest.fn().mockReturnValue({
          frontmatter: { music: 'https://youtu.be/XXX111YYY22' }
        })
      },
      vault: {
        adapter: { getResourcePath: (p: string) => 'r/' + p }
      },
      workspace: { on: jest.fn() }
    } as any

    plugin = new Whisperer(fakeApp, {} as any)
    plugin.settings.ambience_per_files = true
    handler = new PlayerPerFile(plugin)
  })

  it('plays a new file ambience', async () => {
    await handler.handleFileOpen({ path: 'file1.md' } as TFile)
    expect(plugin.activeFile).toBe('file1.md')
    expect(document.querySelector('.file-ambience-player')).toBeTruthy()
  })

  it('pauses previous and vault ambience', async () => {
    plugin.activeFile = 'old.md'
    plugin.fileAmbiencePlayers.set('old.md', {
      player: document.createElement('audio'),
      position: 0
    })
    plugin.settings.vault_ambience = true
    const spy = jest.spyOn(plugin, 'unapply')
    await handler.handleFileOpen({ path: 'new.md' } as TFile)
    expect(spy).toHaveBeenCalled()
    expect(plugin.fileAmbiencePlayers.has('old.md')).toBe(false)
  })

  it('does nothing when ambience_per_files = false', async () => {
    plugin.settings.ambience_per_files = false
    const spy = jest.spyOn(handler, 'playFileAmbience')
    await handler.handleFileOpen({ path: 'x.md' } as TFile)
    expect(spy).not.toHaveBeenCalled()
  })
})
