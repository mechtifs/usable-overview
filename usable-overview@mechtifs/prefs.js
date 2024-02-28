'use strict';

import {
    ExtensionPreferences,
    gettext,
} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js'

import * as UI from './ui.js'


export default class UsableOverviewPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        window.set_title(gettext('Usable Overview'));
        const _settings = this.getSettings();

        const _appearancePage = new UI.Page(null, null, [
            new UI.Group('Appearance', 'Configure the appearance of Usable Overview.', [
                ['hide-button', UI.nSwitch('Hide Button', 'Hide "Show Apps" button in the overview dash.'), 'active']
            ]),
        ]);

        _appearancePage.bind(_settings);

        window.add(_appearancePage);
    }
}
