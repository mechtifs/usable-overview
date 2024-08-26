'use strict';

import GLib from 'gi://GLib';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

export default class UsableOverviewExtension extends Extension {
	enable() {
		this._triggerTime = 0;
		Main.panel.statusArea['activities'].connectObject(
			'button-release-event', (_, event) => {
				if (event.get_button() === 3 && GLib.get_monotonic_time() - this._triggerTime > 500000) {
					Main.overview._overview._controls._toggleAppsPage();
					this._triggerTime = GLib.get_monotonic_time();
				}
			},
			this
		);
	}

	disable() {
		Main.panel.statusArea['activities'].disconnectObject(this);
	}
}
