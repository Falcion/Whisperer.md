/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-env browser, jest */
import WhispererSettingsTab from 'source/settings'
import Whisperer from 'source/main'
import { App } from 'obsidian'

describe('Settings Tab', () => {
  let plugin: Whisperer, tab: WhispererSettingsTab, container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    container.empty() // from jest.setup.js

    plugin = new Whisperer({} as any, {} as any)
    tab = new WhispererSettingsTab({} as App, plugin);
    // override the tab's containerEl
    (tab as any).containerEl = container
  })

  it('renders at least one setting item', () => {
    tab.display()
    const items = container.querySelectorAll('.setting-item')
    expect(items.length).toBeGreaterThan(0)
  })
})
