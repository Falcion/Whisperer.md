import { Setting, TextAreaComponent } from 'obsidian'
import Whisperer from './../main'

export default class SettingsConstructor {
  private defaults?: {
    color: string
    borderColor: string
    borderWidth: string
  } = undefined

  private _SETTING_AMBIENCE?: Setting
  private _SETTING_VAULT_PATH_TITLE?: Setting
  private _SETTING_VAULT_PATH_INPUT?: TextAreaComponent
  private _SETTING_AMBIENCE_PER_FILE?: Setting
  private _SETTING_AMBIENCE_PER_FILE_COMMENT?: Setting
  private _SETTING_MUSICE_VOLUME?: Setting
  private _SETTING_DEBUG_FRAMES?: Setting

  public plugin: Whisperer
  public containerEl: HTMLElement

  constructor (_plugin: Whisperer, _containerEl: HTMLElement) {
    this.plugin = _plugin
    this.containerEl = _containerEl
  }

  public get SETTING_AMBIENCE (): Setting {
    if (this._SETTING_AMBIENCE == null) {
      this._SETTING_AMBIENCE = new Setting(this.containerEl)
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

            SettingsConstructor.updateDisplays(
              [this.SETTING_VAULT_PATH_TITLE, this.SETTING_VAULT_PATH_INPUT],
              [value, value]
            )
          })

          return toggle
        })
    }

    return this._SETTING_AMBIENCE
  }

  public get SETTING_VAULT_PATH_TITLE (): Setting {
    if (this._SETTING_VAULT_PATH_TITLE == null) {
      this._SETTING_VAULT_PATH_TITLE = new Setting(this.containerEl)
        .setName("Path/URL to the audio of Vault's ambience (supports YouTube, SoundCloud):")
        .setDesc(
          "Be aware, that some videos on YouTube are blocked to be played as embed, so they may be not working in the Obsidian's Vault."
        )
    }

    return this._SETTING_VAULT_PATH_TITLE
  }

  public get SETTING_VAULT_PATH_INPUT (): TextAreaComponent {
    if (this._SETTING_VAULT_PATH_INPUT == null) {
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

      this._SETTING_VAULT_PATH_INPUT = result
    }

    return this._SETTING_VAULT_PATH_INPUT
  }

  public get SETTING_AMBIENCE_PER_FILE (): Setting {
    if (this._SETTING_AMBIENCE_PER_FILE == null) {
      this._SETTING_AMBIENCE_PER_FILE = new Setting(this.containerEl)
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

    return this._SETTING_AMBIENCE_PER_FILE
  }

  public get SETTING_AMBIENCE_PER_FILE_COMMENT (): Setting {
    if (this._SETTING_AMBIENCE_PER_FILE_COMMENT == null) {
      this._SETTING_AMBIENCE_PER_FILE_COMMENT = new Setting(this.containerEl)
        .setName('')
        .setDesc(
          'To apply custom ambience to file, insert into the metadata cache of the file (YAML) "music" variable with URL or path to your audio.'
        )
    }

    return this._SETTING_AMBIENCE_PER_FILE_COMMENT
  }

  public get SETTING_MUSIC_VOLUME (): Setting {
    if (this._SETTING_MUSICE_VOLUME == null) {
      this._SETTING_MUSICE_VOLUME = new Setting(this.containerEl)
        .setName('Music volume')
        .setDesc(
          "Control volume of YouTube/Local audios. Audio from SoundCloud doesn't support this feature."
        )
        .addSlider((slider) => {
          slider
            .setDynamicTooltip()
            .setLimits(
              this.plugin.settings.MIN_VOLUME,
              this.plugin.settings.MAX_VOLUME,
              this.plugin.settings.VOLUME_STEP
            )
            .onChange(async (value) => {
              const next = {
                ...this.plugin.settings,
                music_volume: value
              }

              await this.plugin.updateVolumeSettings(next)
            })
        })
    }

    return this._SETTING_MUSICE_VOLUME
  }

  public get SETTING_DEBUG_FRAMES (): Setting {
    if (this._SETTING_DEBUG_FRAMES == null) {
      this._SETTING_DEBUG_FRAMES = new Setting(this.containerEl)
        .setName('Debug frames:')
        .setDesc(
          'Allows you to view frames generated by this plugin, meaning you can view mini-players for music/video.'
        )
        .addToggle((toggle) => {
          toggle.setValue(this.plugin.settings.debug_frames).onChange(async (value) => {
            const next = {
              ...this.plugin.settings,
              debug_frames: value
            }

            await this.plugin.updateSettings(next)
          })
        })
    }

    return this._SETTING_DEBUG_FRAMES
  }

  public static updateDisplays (elements: Array<Setting | TextAreaComponent>, values: boolean[]): void {
    if (elements.length !== values.length) { throw new Error('Elements and their values both are out of range in some other ways.') }

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]

      if (element instanceof Setting) element.settingEl.style.display = values[i] ? 'block' : 'none'
      if (element instanceof TextAreaComponent) { element.inputEl.style.display = values[i] ? 'block' : 'none' }
    }
  }

  private _updateState (data: TextAreaComponent, prev: boolean, next: boolean): void {
    if (prev !== next) {
      if (prev) {
        if (this.defaults == null) {
          this.defaults = {
            color: data.inputEl.style.color,
            borderColor: data.inputEl.style.borderColor,
            borderWidth: data.inputEl.style.borderWidth
          }
        }

        data.inputEl.style.color = 'red'
        data.inputEl.style.borderColor = 'red'
        data.inputEl.style.borderWidth = '4px'
      } else if (this.defaults != null) {
        data.inputEl.style.color = this.defaults.color
        data.inputEl.style.borderColor = this.defaults.borderColor
        data.inputEl.style.borderWidth = this.defaults.borderWidth
      }
    }
  }
}
