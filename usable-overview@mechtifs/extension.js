'use strict';

import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

import { initSettings } from './utils.js';


export default class UsableOverviewExtension extends Extension {
	_showApps(event) {
		if (event.get_button() === 3 && GLib.get_monotonic_time() - this._triggerTime > 500000) {
			Main.overview._overview._controls._toggleAppsPage();
			this._triggerTime = GLib.get_monotonic_time();
		}
	}

	enable() {
		this._settings = this.getSettings();
		initSettings(this._settings, [
			['hide-button', 'b', (r) => Main.overview.dash._showAppsIcon.set_width(r ? 0 : -1)],
		]);
		this._triggerTime = 0;
		Main.panel.statusArea['activities'].connectObject(
			'button-release-event',
			(widget, event) => this._showApps(event),
			this
		);
	}

	disable() {
		Main.panel.statusArea['activities'].disconnectObject(this);
		Main.overview.dash._showAppsIcon.set_width(-1);
	}
}
