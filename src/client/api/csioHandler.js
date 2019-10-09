'use strict';
import networkStrengthMonitor from './networkStrengthMonitor';
import audioFrequencyMonitor from './audioFrequencyMonitor';

import lo from 'lodash';
import databaseManager from './databaseManager';
import {
  getRandomInt
} from './../utils/acutils';
import mediaManager from './mediaManager';

const appId = APP_ID || WEB_PACK_APP_ID;
const appSecret = APP_SECRET || WEB_PACK_APP_SECRET;
const enableJabraCollection = ENABLE_JABRA_COLLECTION === 'enable';
const siteIds = ['HQ', 'Remote', 'Home'];

const ccpUrl = () => {
  const connectURL = databaseManager.getDefaultConnectURL(CONNECT_URL || WEB_PACK_CONNECT_URL);
  return `https://${connectURL}/connect/ccp#/`;
};

class CSIOHandler {
  constructor () {
    this.callstatsac = undefined;
    this.dispatch = undefined;
    this.localUserId = undefined;
    // eslint-disable-next-line new-cap
    this.agentMonitor = new callstatsAgentMonitor();
  }

  /**
   * @private
   * @return {string} Return a site id from given site id list
   */
  getRandomSiteId () {
    return siteIds[ getRandomInt(1, siteIds.length) - 1 ];
  }
  // eslint-disable-next-line handle-callback-err
  onCSIOInitialize (err, msg) {
    // console.warn('->', 'onCSIOInitialize', new Date(), err, msg);
  }

  onCSIOStats (stats) {
    // console.warn('->onCSIOStats', stats);
    if (stats && stats.fabricState === 'terminated') {
      return;
    }

    if (stats && stats.mediaStreamTracks) {
      let track1 = lo.first(stats.mediaStreamTracks);
      let track2 = lo.last(stats.mediaStreamTracks);

      // console.warn('~', stats);
      let audioIntputLevel = parseInt(track1.audioIntputLevel || track2.audioIntputLevel || 0, 10);
      let audioOutputLevel = parseInt(track1.audioOutputLevel || track2.audioOutputLevel || 0, 10);

      let track1Bitrate = parseInt(track1.bitrate || 0, 10);
      let track2Bitrate = parseInt(track2.bitrate || 0, 10);
      let track1RTT = parseInt(track1.rtt || 0, 10);
      // no rtt for inbound tracks.
      // let track2RTT = parseInt(track1.rtt || 0, 10);

      let track1Fl = parseInt(track1.fractionLoss || 0, 10);
      let track2Fl = parseInt(track2.fractionLoss || 0, 10);

      //      console.warn('-> ', 'on csio stats', stats);
      networkStrengthMonitor.addThroughput(track1Bitrate, track2Bitrate);
      networkStrengthMonitor.addRTT(track1RTT, track1RTT);
      networkStrengthMonitor.addRTT(track1Fl, track2Fl);
      audioFrequencyMonitor.addAudioLevel(audioIntputLevel, false);
      audioFrequencyMonitor.addAudioLevel(audioOutputLevel, true);
    }
  }

  getRemoteStream () {
    const pc = CallstatsAmazonShim && CallstatsAmazonShim.getPeerConnection();
    if (!pc) {
      return undefined;
    }
    const remoteStreams = pc.getRemoteStreams();
    return remoteStreams && lo.get(remoteStreams, 0, undefined);
  }

  doPrecallTest () {
    return new Promise((resolve) => {
      if (CallstatsAmazonShim) {
        CallstatsAmazonShim.makePrecallTest((status, result) => {
          // console.warn('-> ', 'on precall test', status, result);
          let testResult = databaseManager.savePrecalltestResult(result);

          let throughput = lo.get(result, 'throughput', 0);
          let rtt = lo.get(result, 'rtt', 0);
          let fractionalLoss = lo.get(result, 'fractionalLoss', 0);
          networkStrengthMonitor.addThroughput(throughput, throughput);
          networkStrengthMonitor.addRTT(rtt, rtt);
          networkStrengthMonitor.addFractionalLoss(fractionalLoss, fractionalLoss);
          resolve(testResult);
        });
      }
    });
  }

  onCSIORecommendedConfigCallback (config) {
    // console.warn('->', 'onCSIORecommendedConfigCallback', new Date(), config);
  }

  onCSIOPrecalltestCallback (status, result) {
    // console.warn('-> ', 'on precall test', status, result);
    databaseManager.savePrecalltestResult(result);
    let throughput = lo.get(result, 'throughput', 0);
    let rtt = lo.get(result, 'rtt', 0);
    let fractionalLoss = lo.get(result, 'fractionalLoss', 0);
    networkStrengthMonitor.addThroughput(throughput, throughput);
    networkStrengthMonitor.addRTT(rtt, rtt);
    networkStrengthMonitor.addFractionalLoss(fractionalLoss, fractionalLoss);
  }

  dispose () {
    this.dispatch = undefined;
  }

  register (dispatch = undefined, agent = undefined) {
    this.dispatch && this.dispose();
    this.dispatch = dispatch;

    if (!agent) {
      // console.error('agent object cannot be empty');
      return;
    }
    if (!CallstatsAmazonShim) {
      // console.error('CallstatsAmazonShim object cannot be empty');
      return;
    }
    const localUserId = agent.getName();
    this.localUserId = localUserId;
    const configParams = {
      siteID: this.getRandomSiteId(),
      enableJabraCollection: enableJabraCollection
    };

    if (this.callstatsac) {
      this.callstatsac = undefined;
    }

    this.callstatsac = CallstatsAmazonShim.initialize(connect, appId, appSecret, localUserId, configParams, this.onCSIOInitialize, this.onCSIOStats);
    this.callstatsac.on('recommendedConfig', this.onCSIORecommendedConfigCallback.bind(this));
    this.callstatsac.on('preCallTestResults', this.onCSIOPrecalltestCallback.bind(this));

    // add agent monitor
    if (this.agentMonitor && typeof this.agentMonitor.initialize === 'function') {
      this.agentMonitor.initialize(connect, ccpUrl(), appId, appSecret, localUserId, configParams);
    }
  }

  // Quick hack to send feedback in structural way before we have a API for that
  postProcessFeedback (feedbackJSON = {}) {
    let markedFeedback = [];
    for (let currentIssue of feedbackJSON.issueList || []) {
      for (let issue of currentIssue.items || []) {
        if (issue.marked === true) {
          markedFeedback.push(issue.text);
        }
      }
    }
    return markedFeedback;
  }

  sendFeedback (feedbackJSON = {}) {
    let markedFeedbackList = this.postProcessFeedback(feedbackJSON);
    let feedbackText = `${[feedbackJSON.feedbackText, ...markedFeedbackList].join(' ,')}`;
    const feedback = {
      userId: this.localUserId,
      overall: Math.max(feedbackJSON.feedbackRatings, 1),
      comment: feedbackText
    };
    CallstatsAmazonShim.sendUserFeedback(feedback, msg => {
      // console.warn('on submitted feedback ', msg);
    });
  }

  sendFeedbackRating (feedbackRating = 1) {
    const feedback = {
      userId: this.localUserId,
      overall: Math.max(feedbackRating, 1)
    };
    CallstatsAmazonShim.sendUserFeedback(feedback, msg => {
      console.warn('on submitted rating ', msg);
    });
  }

  sendActiveDeviceList () {
    mediaManager.getDefaultOrPreferredAudioInputDevice()
      .then(activeAudioDevice => {
        const eventData = {
          deviceList: [activeAudioDevice]
        };
        CallstatsAmazonShim.sendFabricEvent(this.callstatsac.fabricEvent.activeDeviceList, eventData);
      })
      .catch(() => {});
  }
}

const csioHandler = new CSIOHandler();
export default csioHandler;
