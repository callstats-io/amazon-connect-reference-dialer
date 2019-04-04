import {
    throughputThreshold,
    qualityAsString,
} from './../configs/consts';

const HASH = 10000009;
const MAX_ITERATION_COUNT = 5;
const MAX_ZERO_COUNT = 2;
const getRandom = () => {
    return Math.round(Math.random() * HASH);
};

class NetworkStrengthMonitor {
    constructor() {
        this.hash = getRandom();
        this.hashLastPulled = getRandom();
        this.consicutiveMissCount = 0;
        this.curBitrate = 0;
        this.consicutiveZero = false;
    }

    addThroughput(outboundBitrate = 0, inboundBitrate = 0) {
        // this.hash = getRandom();
        let totalTraffic = (outboundBitrate + inboundBitrate) / 2;
        this.consicutiveZero = totalTraffic < 1 ? this.consicutiveZero + 1 : 0;

        if (totalTraffic < 1 && this.consicutiveZero < 2) {
            return;
        }
        // console.warn('->addThroughput', outboundBitrate, inboundBitrate);
        let avgBitrate = (outboundBitrate + inboundBitrate) / 2;
        this.curBitrate = avgBitrate;
    }

    getNetworkStrength() {
        // let diff = Math.abs(this.hash - this.hashLastPulled);
        //
        // if (diff > 0) {
        // 	this.consicutiveMissCount = 0;
        // } else {
        // 	this.consicutiveMissCount += 1;
        // }
        // // if (this.consicutiveMissCount > MAX_ITERATION_COUNT) {
        // // 	return 0;
        // // }

        // this.hashLastPulled = this.hash;
        // console.warn('->NetworkStrengthMonitor', this.curBitrate);
        return throughputThreshold(this.curBitrate);
    }

    getNetworkStrengthAsString() {
        const networkStrength = this.getNetworkStrength();
        return qualityAsString(networkStrength);
    }

}

const networkStrengthMonitor = new NetworkStrengthMonitor();
export default networkStrengthMonitor;
