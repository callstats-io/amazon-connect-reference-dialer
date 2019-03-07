import {throughputThreshold} from "../configs/consts";

const HASH = 10000009;
const MAX_ITERATION_COUNT = 5;
const getRandom = () => {
	return Math.round(Math.random() * HASH);
};

class FrequencyMonitor {
	constructor() {
		this.hash = getRandom();
		this.hashLastPulled = getRandom();
		this.consicutiveMissCount = 0;
		this.curAudioLevel = 0;

	}

	addAudioLevel(audioLevel = 0) {
		this.hash = getRandom();
		this.curAudioLevel = audioLevel;
	}

	getAudioLevel() {
		let diff = Math.abs(this.hash - this.hashLastPulled);

		if (diff > 0) {
			this.consicutiveMissCount = 0;
		} else {
			this.consicutiveMissCount += 1;
		}
		if (this.consicutiveMissCount > MAX_ITERATION_COUNT) {
			return 0;
		}
		this.hashLastPulled = this.hash;
		return this.curAudioLevel;
	}

}

class AudioFrequencyMonitor {
	constructor() {
		this.inboundMonitor = new FrequencyMonitor();
		this.outboundMonitor = new FrequencyMonitor();
	}

	addAudioLevel(audioLevel = 0, isOutbound = false) {
		if (isOutbound) {
			this.outboundMonitor.addAudioLevel(audioLevel);
		} else {
			this.inboundMonitor.addAudioLevel(audioLevel);
		}
		console.warn('->addAudioLevel', this.inboundMonitor.curAudioLevel, this.outboundMonitor.curAudioLevel)
	}

	getAudioLevel(isOutbound = false) {
		console.warn('->getAudioLevel', this.inboundMonitor.curAudioLevel, this.outboundMonitor.curAudioLevel)
		if (isOutbound) {
			return this.outboundMonitor.getAudioLevel()
		} else {
			return this.inboundMonitor.getAudioLevel();
		}
	}
}

const audioFrequencyMonitor = new AudioFrequencyMonitor();
export default audioFrequencyMonitor;
