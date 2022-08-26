const { GLib } = imports.gi;
const Main = imports.ui.main;

var OVERVIEW_ACTIVATION_TIMEOUT = 0.5;

let _rightClick;
let _triggerTime = 0;

function _showApps(widget, event) {
	if (event.get_button() == 3
			&& GLib.get_monotonic_time() / GLib.USEC_PER_SEC - _triggerTime > OVERVIEW_ACTIVATION_TIMEOUT) {
		Main.overview._overview._controls._toggleAppsPage();
		_triggerTime = GLib.get_monotonic_time() / GLib.USEC_PER_SEC;
	}
}

function init() {
}

function enable() {
	_rightClick = Main.panel.statusArea['activities'].connect('button-release-event', _showApps);
}

function disable() {
	Main.panel.statusArea['activities'].disconnect(_rightClick);
}
