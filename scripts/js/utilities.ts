/**
 * The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @license MIT
 * @author Falcion
 * @year 2023-2025
 */

import * as fs from 'fs';
import * as colors from 'colors/safe';

(async () => {
    // Configuration
    const CONFIG = {
        ROOT_DIR: './../../',
        FILE_CHANGELOG: 'CHANGELOG.md',
        FILE_VERSIONING: 'UNSUPPORTED_VERSIONS.md',
        IGNORE_MARKDOWNLINT: '<!-- markdownlint-disable -->'
    };

    //#region Checking CHANGELOG upon ignoring markdownlint
    const CHANGELOG_PATH = CONFIG.ROOT_DIR + CONFIG.FILE_CHANGELOG;
    const CHANGELOG_DATA = fs.readFileSync(CHANGELOG_PATH, { encoding: 'utf-8' }).split('\n');

    console.log(CHANGELOG_DATA[0]);
    console.log(CHANGELOG_DATA[0].includes(CONFIG.IGNORE_MARKDOWNLINT));

    if (!CHANGELOG_DATA[0].includes(CONFIG.IGNORE_MARKDOWNLINT)) {
        const updatedData = [CONFIG.IGNORE_MARKDOWNLINT, ...CHANGELOG_DATA].join('\n');

        fs.writeFile(CHANGELOG_PATH, updatedData, (err) => {
            if (err) {
                console.error('Error writing to CHANGELOG:', err.message);
            } else {
                console.log('CHANGELOG updated successfully.');
            }
        });
    }
    //#endregion

    //#region Checking UNSUPPORTED_VERSIONS upon ignoring markdownlint
    const VERSIONING_PATH = CONFIG.ROOT_DIR + CONFIG.FILE_VERSIONING;
    const VERSIONING_DATA = fs.readFileSync(VERSIONING_PATH, { encoding: 'utf-8' }).split('\n');

    console.log(VERSIONING_DATA[0]);
    console.log(VERSIONING_DATA[0].includes(CONFIG.IGNORE_MARKDOWNLINT));

    if (!VERSIONING_DATA[0].includes(CONFIG.IGNORE_MARKDOWNLINT)) {
        const updatedData = [CONFIG.IGNORE_MARKDOWNLINT, ...VERSIONING_DATA].join('\n');

        fs.writeFile(VERSIONING_PATH, updatedData, (err) => {
            if (err) {
                console.error('Error writing to UNSUPPORTED_VERSIONS:', err.message);
            } else {
                console.log('UNSUPPORTED_VERSIONS updated successfully.');
            }
        });
    }
    //#endregion

    console.warn(
        colors.bgYellow(
            colors.bold(
                colors.blue(
                    "Please, check and assign correct status for project in README after the release to show the current status of the project's development."
                )
            )
        )
    );
})();
