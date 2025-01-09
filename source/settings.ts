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

import { App, PluginSettingTab, Setting, TextAreaComponent } from "obsidian";
import Whisperer from "./main";

export interface WHISPERER_SETTINGS {
    vault_ambience: boolean,
    vault_ambience_path: string,
    ambience_per_files: boolean,
    music_volume: number,
}

export const DEFAULT_SETTINGS: WHISPERER_SETTINGS = {
    vault_ambience: false,
    vault_ambience_path: '',
    ambience_per_files: true,
    music_volume: 50,
}

export default class WhispererSettingsTab extends PluginSettingTab {
    plugin: Whisperer;

    private defaults?: {
        color: string;
        borderColor: string;
        borderWidth: string;
    } = undefined;

    constructor(app: App, plugin: Whisperer) {
        super(app, plugin);

        this.plugin = plugin;
    }

    display(): void {
        const {
            containerEl
        } = this;

        containerEl.empty();
        containerEl.createEl('h3', { text: 'Whisperer\'s settings:' });

        new Setting(containerEl)
            .setName('Vault ambience:')
            .setDesc('If enabled, plugin would try to apply your embed URL as audio for the vault\'s ambience.')
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.vault_ambience)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            vault_ambience: value,
                        };

                        await this.plugin.updateSettings(next);

                        this._updateDisplays([vaultAmbiencePath, vaultAmbiencePathInput], [value, value]);
                    });

                return toggle;
            });

        const vaultAmbiencePath = new Setting(containerEl)
            .setName('Path/URL to the audio of Vault\'s ambience (supports YouTube, SoundCloud):')
            .setDesc('Be aware, that some videos on YouTube are blocked to be played as embed, so they may be not working in the Obsidian\'s Vault.');

        const vaultAmbiencePathInput = new TextAreaComponent(containerEl)
            .setPlaceholder('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            .setValue(this.plugin.settings.vault_ambience_path)
            .onChange(async (value) => {
                const next = {
                    ...this.plugin.settings
                };

                next.vault_ambience_path = value;

                await this.plugin.updateSettings(next);
            });

        vaultAmbiencePathInput.inputEl.style.width = '100%';
        vaultAmbiencePathInput.inputEl.style.height = '48px';
        vaultAmbiencePathInput.inputEl.style.minHeight = '36px';

        this._updateDisplays([vaultAmbiencePath, vaultAmbiencePathInput], [this.plugin.settings.vault_ambience, this.plugin.settings.vault_ambience]);

        new Setting(containerEl)
            .setName('Ambience per files:')
            .setDesc('If enabled, plugin would try to apply your embed URL as audio for the files\'s ambience specifically: meaning one file got one ambience and etc., prioritised over vault\'s ambience (vault ambience would stop playing).')
            .addToggle(toggle => {
                toggle
                    .setValue(this.plugin.settings.ambience_per_files)
                    .onChange(async (value) => {
                        const next = {
                            ...this.plugin.settings,
                            ambience_per_files: value,
                        };

                        await this.plugin.updateSettings(next);
                    });

                return toggle;
            });

        new Setting(containerEl)
            .setName('')
            .setDesc('To apply custom ambience to file, insert into the metadata cache of the file (YAML) "music" variable with URL or path to your audio.');
    }

    private _updateDisplays(elements: (Setting | TextAreaComponent)[], values: boolean[]) {
        if (elements.length !== values.length)
            throw new Error('Elements and their values both are out of range in some other ways.');

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element instanceof Setting)
                element.settingEl.style.display = values[i] ? 'block' : 'none';
            if (element instanceof TextAreaComponent)
                element.inputEl.style.display = values[i] ? 'block' : 'none';
        }
    }

    private _updateState(data: TextAreaComponent, prev: boolean, next: boolean): void {
        if (prev !== next)
            if (prev) {
                if (!this.defaults) {
                    this.defaults = {
                        color: data.inputEl.style.color,
                        borderColor: data.inputEl.style.borderColor,
                        borderWidth: data.inputEl.style.borderWidth,
                    };
                }

                data.inputEl.style.color = 'red';
                data.inputEl.style.borderColor = 'red';
                data.inputEl.style.borderWidth = '4px';
            } else if (this.defaults) {
                data.inputEl.style.color = this.defaults.color;
                data.inputEl.style.borderColor = this.defaults.borderColor;
                data.inputEl.style.borderWidth = this.defaults.borderWidth;
            }
    }
}
