/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
export class Plugin {
  constructor (public app?: any, public manifest?: any) { }
  onload () { }
  onunload () { }
}
export interface App {
  workspace: any
  vault: any
  metadataCache: any
}
export interface TFile { path: string }
export class PluginSettingTab {
  constructor (public app: App, public plugin: any) { }
  display (): void { }
}
export class Setting {
  public settingEl = document.createElement('div')
  constructor (public containerEl: HTMLElement) {
    this.settingEl.classList.add('setting-item')
    this.containerEl.appendChild(this.settingEl)
  }

  setName () { return this }
  setDesc () { return this }
  addToggle () { return this }
  addSlider () { return this }
}
export class TextAreaComponent {
  public inputEl = document.createElement('textarea')
  constructor (public containerEl: HTMLElement) {
    this.inputEl.classList.add('setting-item')
    this.containerEl.appendChild(this.inputEl)
  }

  setPlaceholder () { return this }
  setValue () { return this }
  onChange () { return this }
}
