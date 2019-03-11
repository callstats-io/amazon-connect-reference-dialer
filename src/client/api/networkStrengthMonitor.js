import {throughputThreshold} from './../configs/consts';

const HASH = 10000009;
const MAX_ITERATION_COUNT = 5;
const getRandom = () => {
	return Math.round(Math.random() * HASH);
};

class NetworkStrengthMonitor {
	constructor() {
		this.hash = getRandom();
		this.hashLastPulled = getRandom();
		this.consicutiveMissCount = 0;
		this.curBitrate = 0;
	}

	addThroughput(outboundBitrate = 0, inboundBitrate = 0) {
		this.hash = getRandom();
		let avgBitrate = (outboundBitrate + inboundBitrate) / 2;
		this.curBitrate = avgBitrate;
	}

	getNetworkStrength() {
		let diff = Math.abs(this.hash - this.hashLastPulled);

		if (diff > 0) {
			this.consicutiveMissCount = 0;
		} else {
			this.consicutiveMissCount += 1;
		}
		// if (this.consicutiveMissCount > MAX_ITERATION_COUNT) {
		// 	return 0;
		// }

		this.hashLastPulled = this.hash;
		return throughputThreshold(this.curBitrate);
	}

}

const networkStrengthMonitor = new NetworkStrengthMonitor();
export default networkStrengthMonitor;
