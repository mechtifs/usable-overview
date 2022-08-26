const Main = imports.ui.main;

let _indicator;

function _showApps(widget, event) {
	if (event.get_button() == 3) {
		Main.overview._overview._controls._toggleAppsPage();
	}
}

function init() {
}

function enable() {
    _indicator = Main.panel.statusArea['activities'].connect('button-release-event', _showApps);
}

function disable() {
	Main.panel.statusArea['activities'].disconnect(_indicator);
}

