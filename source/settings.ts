/*
 * MIT License
 *
 * Copyright (c) 2023-2025 Falcion
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Any code and/or API associated with OBSIDIAN behaves as stated in their distribution policy.
 */

import { App, PluginSettingTab } from 'obsidian'
import Whisperer from './main'
import SettingsConstructor from './settings/settings_class'

export default class WhispererSettingsTab extends PluginSettingTab {
  plugin: Whisperer

  constructor (app: App, plugin: Whisperer) {
    super(app, plugin)

    this.plugin = plugin
  }

  display (): void {
    const { containerEl } = this

    containerEl.empty()

    const settingsConstructor = new SettingsConstructor(this.plugin, containerEl)

    const items = [
      settingsConstructor.SETTING_AMBIENCE,
      settingsConstructor.SETTING_VAULT_PATH_TITLE,
      settingsConstructor.SETTING_VAULT_PATH_INPUT,
      settingsConstructor.SETTING_AMBIENCE_PER_FILE,
      settingsConstructor.SETTING_AMBIENCE_PER_FILE_COMMENT,
      settingsConstructor.SETTING_DEBUG_FRAMES
    ]

    SettingsConstructor.updateDisplays(
      [items[1], items[2]],
      [this.plugin.settings.vault_ambience, this.plugin.settings.vault_ambience]
    )
  }
}
