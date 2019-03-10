'use strict';
import networkStrengthMonitor from './networkStrengthMonitor';
import audioFrequencyMonitor from './audioFrequencyMonitor';

import lo from 'lodash';
import databaseManager from "./databaseManager";


const appId = "821179284";
const appSecret = "IgR4qo4cNUrP:qxkQFJYb0ITsgJHv5DZYG+Bih7tCPfmb9XlixwvlVcE=";

class CSIOHandler {
	constructor() {
		this.callstats = undefined;
		this.dispatch = undefined;
		this.localUserId = undefined;
	}


	onCSIOInitialize(err, msg) {
		console.warn('->', 'onCSIOInitialize', new Date(), err, msg);
	}

	onCSIOStats(stats) {
		if (stats && stats.fabricState === 'terminated') {
			return;
		}

		console.warn('->', 'onCSIOStats', new Date(), stats);
		if (stats && stats.mediaStreamTracks) {
			let track1 = lo.first(stats.mediaStreamTracks);
			let track2 = lo.last(stats.mediaStreamTracks);


			let audioIntputLevel = parseInt(track1.audioIntputLevel || track2.audioIntputLevel || 0);
			let audioOutputLevel = parseInt(track1.audioOutputLevel || track2.audioOutputLevel || 0);

			let track1Bitrate = track1.bitrate || 0;
			let track2Bitrate = track2.bitrate || 0;

			networkStrengthMonitor.addThroughput(track1Bitrate, track2Bitrate);
			audioFrequencyMonitor.addAudioLevel(audioIntputLevel, false);
			audioFrequencyMonitor.addAudioLevel(audioOutputLevel, true);

		}
	}

	doPrecallTest() {
		return new Promise((resolve) => {
			let cs = new callstats();
			cs.initialize(appId, appSecret, this.localUserId, {}, null, null);
			cs.on('preCallTestResults', (status, result) => {
				let testResult = databaseManager.savePrecalltestResult(result);
				resolve(testResult);
			});
		});

	}

	onCSIORecommendedConfigCallback(config) {
		console.warn('->', 'onCSIORecommendedConfigCallback', new Date(), config);
	}

	onCSIOPrecalltestCallback(status, result) {
		let testResult = databaseManager.savePrecalltestResult(result);
		console.warn('->', 'onCSIOPrecalltestCallback', new Date(), status, result, testResult);
		let throughput = lo.get(result, 'throughput', 0);
		networkStrengthMonitor.addThroughput(throughput, throughput);
	}

	dispose() {
		this.dispatch = undefined;
	}

	register(dispatch = undefined, agent = undefined) {
		this.dispatch && this.dispose();
		this.dispatch = dispatch;

		if (!agent) {
			console.error('agent object cannot be empty');
			return;
		}
		if (!CallstatsAmazonShim) {
			console.error('CallstatsAmazonShim object cannot be empty');
			return;
		}
		const localUserId = agent.getName();
		this.localUserId = localUserId;
		const configParams = {};
		if (this.callstats) {
			this.callstats = undefined;
		}

		this.callstats = CallstatsAmazonShim.initialize(connect, appId, appSecret, localUserId, configParams, this.onCSIOInitialize, this.onCSIOStats);
		this.callstats.on('recommendedConfig', this.onCSIORecommendedConfigCallback.bind(this));
		this.callstats.on('preCallTestResults', this.onCSIOPrecalltestCallback.bind(this));
	}

}

const csioHandler = new CSIOHandler();
export default csioHandler;
