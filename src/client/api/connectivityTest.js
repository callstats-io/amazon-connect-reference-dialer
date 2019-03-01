'use strict';

import pouchdb from 'pouchdb';
import lo from 'lodash';

const dbName = 'smart_connectivity_tests';

class ConnectivityTest {
	constructor() {
		this.db = new pouchdb(dbName);
		this.lastTestResult = undefined;
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
			const chartData = records.total_rows > 0 && records.rows.map((item, indx)=>{
				return { rtt : item.doc.rtt, tm: item.doc._id, itr: indx };
			});
			return chartData || [];
		} catch (err) {
			console.error('->', 'error fetching records', err);
		}
		return [];
	}

}

const connectivityTest = new ConnectivityTest();
export default connectivityTest;
