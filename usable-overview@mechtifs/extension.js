import GLib from 'gi://GLib';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

export default class UsableOverviewExtension extends Extension {
	showApps(widget, event) {
		if (event.get_button() === 3
				&& GLib.get_monotonic_time() / GLib.USEC_PER_SEC - this._triggerTime > 0.5) {
			Main.overview._overview._controls._toggleAppsPage();
			this._triggerTime = GLib.get_monotonic_time() / GLib.USEC_PER_SEC;
		}
	}

	enable() {
		this._triggerTime = 0;
		Main.panel.statusArea['activities'].connectObject(
			'button-release-event', (widget, event) => this.showApps(widget, event), this);
	}

	disable() {
		Main.panel.statusArea['activities'].disconnectObject(this);
	}
}
