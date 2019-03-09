'use strict';

import pouchdb from 'pouchdb';
import lo from 'lodash';

const dbName = 'smart_connectivity_tests';
const deviceDB = 'device_db';

class DatabaseManager {
	constructor() {
		this.db = new pouchdb(dbName);
		this.deviceDB = new pouchdb(deviceDB);
		this.lastTestResult = undefined;
		this.selectedDevice = undefined;
	}

	async savePrecalltest(result) {
		this.lastTestResult = Object.assign({}, result);
		const rtt = result && (result.rtt || 0);
		const isoTime = new Date().toISOString();
		const record = {
			_id: isoTime,
			rtt: rtt,
		};
		try {
			const doc = await this.db.put(record);
			return doc;
		} catch (err) {
			console.error('->', err);
		}
		return undefined;
	}

	async getRecords() {
		try {
			const records = await this.db.allDocs({include_docs: true, descending: true});
			const chartData = records.total_rows > 0 && records.rows.map((item) => {
				return {rtt: item.doc.rtt, timeStamps: (item.doc._id)};
			});
			return lo.take(chartData, 500) || [];
		} catch (err) {
			console.error('->', 'error fetching records', err);
		}
		return [];
	}

	async saveDefaultDevice(defaultAudioDevice = {}) {
		this.selectedDevice = defaultAudioDevice;
		/*const record = {
			_id: 'defaultDevice',
			data: defaultAudioDevice,
		};
		try {
			const doc = await this.deviceDB.put(record);
			return doc;
		} catch (err) {
			console.error('->', err);
		}
		return undefined;*/
	}

	async getSelectedAudioDevice() {
		return this.selectedDevice;

		/*try {
			const record = await this.deviceDB.get('defaultDevice');
			return record;
		} catch (err) {
			console.error('->', 'error fetching records', err);
		}*/
	}

}

const databaseManager = new DatabaseManager();
export default databaseManager;
