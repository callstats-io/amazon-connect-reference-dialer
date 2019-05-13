import {
  throughputThreshold,
  qualityAsString
} from './../configs/consts';

const HASH = 10000009;
const getRandom = () => {
  return Math.round(Math.random() * HASH);
};

class NetworkStrengthMonitor {
  constructor () {
    this.hash = getRandom();
    this.hashLastPulled = getRandom();
    this.consicutiveMissCount = 0;
    this.curBitrate = -1;
    this.consicutiveZero = false;
  }

  addThroughput (outboundBitrate = 0, inboundBitrate = 0) {
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

  getNetworkStrength () {
    return throughputThreshold(this.curBitrate);
  }

  getNetworkStrengthAsString () {
    const networkStrength = this.getNetworkStrength();
    return qualityAsString(networkStrength);
  }
}

const networkStrengthMonitor = new NetworkStrengthMonitor();
export default networkStrengthMonitor;
