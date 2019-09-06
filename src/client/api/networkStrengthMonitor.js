import {
  qualityAsString,
  getQuality
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
    this.curFractionalLoss = -1;
    this.curRTT = -1;
    this.consicutiveZero = false;
  }

  addThroughput (outboundBitrate = 0, inboundBitrate = 0) {
    // this.hash = getRandom();
    // let totalTraffic = (outboundBitrate + inboundBitrate) / 2;
    //
    // if (totalTraffic < 1 && this.consicutiveZero < 2) {
    //   return;
    // }
    // console.warn('->addThroughput', outboundBitrate, inboundBitrate);
    // outboundBitrate = checkForPositiveValue(outboundBitrate) ? outboundBitrate : 0;
    // inboundBitrate = checkForPositiveValue(inboundBitrate) ? inboundBitrate : 0;

    let avgBitrate = (outboundBitrate + inboundBitrate) / 2;
    this.curBitrate = avgBitrate;
  }

  addRTT (outboundRTT = 0, inboundRTT = 0) {
    // outboundRTT = checkForPositiveValue(outboundRTT) ? outboundRTT : 102
    // inboundRTT = checkForPositiveValue(inboundRTT) ? inboundRTT : 1024;

    let avgRTT = (outboundRTT + inboundRTT) / 2;
    this.curRTT = avgRTT;
  }

  addFractionalLoss (outboundFL = 0, inboundFL = 0) {
    // outboundFL = checkForPositiveValue(outboundFL) ? outboundFL : 1;
    // inboundFL = checkForPositiveValue(inboundFL) ? inboundFL : 1;
    let avgFL = (outboundFL + inboundFL) / 2;
    this.curFractionalLoss = avgFL;
  }

  getNetworkStrength () {
    return getQuality(this.curBitrate, this.curRTT, this.curFractionalLoss);
    // return throughputThreshold(this.curBitrate);
  }

  getNetworkStrengthAsString () {
    const networkStrength = this.getNetworkStrength();
    return qualityAsString(networkStrength);
  }
}

const networkStrengthMonitor = new NetworkStrengthMonitor();
export default networkStrengthMonitor;
