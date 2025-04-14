import { Setting, TextAreaComponent } from 'obsidian'
import Whisperer from 'source/main'

export default class SettingsConstructor {
  private defaults?: {
    color: string
    borderColor: string
    borderWidth: string
  } = undefined

  public plugin: Whisperer
  public containerEl: HTMLElement

  constructor(_plugin: Whisperer, _containerEl: HTMLElement) {
    this.plugin = _plugin
    this.containerEl = _containerEl
  }

  public get SETTING_AMBIENCE(): Setting {
    return new Setting(this.containerEl)
      .setName('Vault ambience:')
      .setDesc(
        "If enabled, plugin would try to apply your embed URL as audio for the vault's ambience."
      )
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.vault_ambience).onChange(async (value) => {
          const next = {
            ...this.plugin.settings,
            vault_ambience: value
          }

          await this.plugin.updateSettings(next)

          this._updateDisplays(
            [this.SETTING_VAULT_PATH_TITLE, this.SETTING_VAULT_PATH_INPUT],
            [value, value]
          )
        })

        return toggle
      })
  }

  public get SETTING_VAULT_PATH_TITLE(): Setting {
    return new Setting(this.containerEl)
      .setName("Path/URL to the audio of Vault's ambience (supports YouTube, SoundCloud):")
      .setDesc(
        "Be aware, that some videos on YouTube are blocked to be played as embed, so they may be not working in the Obsidian's Vault."
      )
  }

  public get SETTING_VAULT_PATH_INPUT(): TextAreaComponent {
    const result = new TextAreaComponent(this.containerEl)
      .setPlaceholder('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
      .setValue(this.plugin.settings.vault_ambience_path)
      .onChange(async (value) => {
        const next = {
          ...this.plugin.settings
        }

        next.vault_ambience_path = value

        await this.plugin.updateSettings(next)
      })

    result.inputEl.addClass('input-field')

    return result
  }

  public get SETTING_AMBIENCE_PER_FILE(): Setting {
    return new Setting(this.containerEl)
      .setName('Ambience per files:')
      .setDesc(
        "If enabled, plugin would try to apply your embed URL as audio for the files's ambience specifically: meaning one file got one ambience and etc., prioritised over vault's ambience (vault ambience would stop playing)."
      )
      .addToggle((toggle) => {
        toggle.setValue(this.plugin.settings.ambience_per_files).onChange(async (value) => {
          const next = {
            ...this.plugin.settings,
            ambience_per_files: value
          }

          await this.plugin.updateSettings(next)
        })

        return toggle
      })
  }

  public get SETTING_AMBIENCE_PER_FILE_COMMENT(): Setting {
    return new Setting(this.containerEl)
      .setName('')
      .setDesc(
        'To apply custom ambience to file, insert into the metadata cache of the file (YAML) "music" variable with URL or path to your audio.'
      )
  }

  public previewDisplays(): void {
    this._updateDisplays(
      [this.SETTING_VAULT_PATH_TITLE, this.SETTING_VAULT_PATH_INPUT],
      [this.plugin.settings.vault_ambience, this.plugin.settings.vault_ambience]
    )
  }

  private _updateDisplays(elements: (Setting | TextAreaComponent)[], values: boolean[]) {
    if (elements.length !== values.length)
      throw new Error('Elements and their values both are out of range in some other ways.')

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]

      if (element instanceof Setting) element.settingEl.style.display = values[i] ? 'block' : 'none'
      if (element instanceof TextAreaComponent)
        element.inputEl.style.display = values[i] ? 'block' : 'none'
    }
  }

  private _updateState(data: TextAreaComponent, prev: boolean, next: boolean): void {
    if (prev !== next)
      if (prev) {
        if (!this.defaults) {
          this.defaults = {
            color: data.inputEl.style.color,
            borderColor: data.inputEl.style.borderColor,
            borderWidth: data.inputEl.style.borderWidth
          }
        }

        data.inputEl.style.color = 'red'
        data.inputEl.style.borderColor = 'red'
        data.inputEl.style.borderWidth = '4px'
      } else if (this.defaults) {
        data.inputEl.style.color = this.defaults.color
        data.inputEl.style.borderColor = this.defaults.borderColor
        data.inputEl.style.borderWidth = this.defaults.borderWidth
      }
  }
}
