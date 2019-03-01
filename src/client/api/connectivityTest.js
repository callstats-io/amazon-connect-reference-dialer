'use strict';

import pouchdb from 'pouchdb';

const dbName = 'smart_connectivity_tests';

class ConnectivityTest {
	constructor() {
		this.db = new pouchdb(dbName);
		this.lastTestResult = undefined;
	}

	async savePrecalltest(result) {
		this.lastTestResult = Object.assign({}, result);
		const rtt = result && (result.rtt || 0);
		const timeInMs = new Date().toISOString();
		const record = {
			_id: timeInMs,
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
			return records;
		} catch (err) {
			console.error('->', 'error fetching records', err);
		}
		return [];
	}

}

const connectivityTest = new ConnectivityTest();
export default connectivityTest;
