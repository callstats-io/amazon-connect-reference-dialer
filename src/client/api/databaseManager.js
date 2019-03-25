'use strict';

const maxElement = 500;

class DatabaseManager {
	constructor() {
	}

	savePrecalltestResult(result) {
		const isoTime = new Date().toISOString();
		let retval = this.getPrecallTestResult();
		if (retval) {
			if (retval.length > maxElement) {
				retval.shift();
			}
			retval.push({...result, isoTime});
		}

		window.localStorage.setItem('rttResult', JSON.stringify(retval));
		return retval;
	}

	getPrecallTestResult() {
		let result = window.localStorage.getItem('rttResult') || undefined;
		if (result) {
			return JSON.parse(result);
		}
		return [];
	}

	saveDefaultDevice(defaultAudioDevice = undefined) {
		window.localStorage.setItem('defaultDevice', JSON.stringify(defaultAudioDevice));
	}

	getSelectedAudioDevice() {
		return window.localStorage.getItem('defaultDevice') || undefined;
	}

}

const databaseManager = new DatabaseManager();
export default databaseManager;
