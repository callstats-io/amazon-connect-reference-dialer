'use strict';

import Hark from 'hark';
import mediaManager from './mediaManager';
import csioHandler from './csioHandler';
import { getTimestamp } from '../utils/acutils';

const AGENT_SPEAKING = 1 << 1;
const CUSTOMER_SPEAKING = 1 << 0;
const CROSS_TALK = 0x3;
const MAX_SIZE = 40;

const blackListedDevice = ['Jabra Engage 50'];

class VoiceActivityMonitor {
  constructor () {
    this.name = 'VoiceActivityMonitor';
    this.agentSpeechEvent = undefined;
    this.customerSpeechEvent = undefined;
    this.agentVolume = 0;
    this.customerVolume = 0;
    this.talkingState = '';

    this.previousActivityState = 0;
    this.eventList = [];

    this.getVoiceActivity = this.getVoiceActivity.bind(this);
  }

  async isBlackListedDevice () {
    const currentlySelectedDevice = await mediaManager.getDefaultOrPreferredAudioInputDevice();
    if (!currentlySelectedDevice) {
      return false;
    }
    const isBlackListed = blackListedDevice.find(curDevice =>
      currentlySelectedDevice.label &&
      currentlySelectedDevice.label.includes(curDevice));
    return !!isBlackListed;
  }

  /**
   * @private
   * Send bundled voice activity event to callstats end point
   *
   */
  sendCustomEvent () {
    csioHandler.sendCustomVoiceActivity(this.eventList);
    this.eventList = [];
  }

  /**
   * Bundle custom event and send it if it reach threshold
   * @private
   * @param eventType
   */
  bundleVoiceActivityEvents (eventType = null) {
    this.talkingState = eventType;
    const event = {
      type: eventType,
      timestamp: getTimestamp()
    };
    this.eventList.push(event);
    if (this.eventList.length >= MAX_SIZE) {
      this.sendCustomEvent();
    }
  }

  /**
   * A state that contains whether agent and customer is talking or not
   * @param speakingState
   */
  activityMonitor (speakingState = 0) {
    if (speakingState === CROSS_TALK && this.previousActivityState !== CROSS_TALK) {
      this.bundleVoiceActivityEvents('crossTalkStart');
    } else if (speakingState !== CROSS_TALK && this.previousActivityState === CROSS_TALK) {
      this.bundleVoiceActivityEvents('crossTalkStop');
    } else if (speakingState === AGENT_SPEAKING && this.previousActivityState !== AGENT_SPEAKING) {
      this.bundleVoiceActivityEvents('agentSpeakingStart');
    } else if (speakingState !== AGENT_SPEAKING && this.previousActivityState === AGENT_SPEAKING) {
      this.bundleVoiceActivityEvents('agentSpeakingStop');
    } else if (speakingState === CUSTOMER_SPEAKING && this.previousActivityState !== CUSTOMER_SPEAKING) {
      this.bundleVoiceActivityEvents('contactSpeakingStart');
    } else if (speakingState !== CUSTOMER_SPEAKING && this.previousActivityState === CUSTOMER_SPEAKING) {
      this.bundleVoiceActivityEvents('contactSpeakingStop');
    }
    this.previousActivityState = speakingState;
  }

  /**
   * @public
   * Set a local or remote stream
   * @param {Object} stream
   * @param {Boolean} isLocal
   */
  mayBeStart () {
    // Jabra Engage 50
    // if the currently selected headset if Jabra Engage 50 then donot start monitoring

    const localStream = mediaManager.getLocalStream();
    const remoteStream = mediaManager.getRemoteStream();
    if (!(localStream && remoteStream)) {
      return undefined;
    }

    this.stopAsync().then(async () => {
      // disable black listing for test purpose
      // const isBlacklisted = await this.isBlackListedDevice();
      // if (isBlacklisted) {
      //   console.warn('Omit monitoring voice detection for this device since it is done by device');
      //   return;
      // }
      this.agentSpeechEvent = new Hark(localStream, {});
      this.customerSpeechEvent = new Hark(remoteStream, {});

      this.agentSpeechEvent.on('volume_change', (db) => {
        this.agentVolume = Math.round(db);
      });
      this.agentSpeechEvent.on('speaking', () => {
        this.activityMonitor(this.previousActivityState | AGENT_SPEAKING, this.agentVolume, this.customerVolume);
      });
      this.agentSpeechEvent.on('stopped_speaking', () => {
        this.activityMonitor(this.previousActivityState ^ AGENT_SPEAKING, this.agentVolume, this.customerVolume);
      });

      this.customerSpeechEvent.on('volume_change', (db) => {
        this.customerVolume = Math.round(db);
      });
      this.customerSpeechEvent.on('speaking', () => {
        this.activityMonitor(this.previousActivityState | CUSTOMER_SPEAKING, this.agentVolume, this.customerVolume);
      });
      this.customerSpeechEvent.on('stopped_speaking', () => {
        this.activityMonitor(this.previousActivityState ^ CUSTOMER_SPEAKING, this.agentVolume, this.customerVolume);
      });
    });
  }
  /**
   * @public
   * Stop voice activity monitor
   */
  async stopAsync () {
    this.previousActivityState = 0;
    this.agentVolume = 0;
    this.customerVolume = 0;
    this.talkingState = '';
    if (this.eventList.length > 0) {
      this.sendCustomEvent();
    }
    if (this.agentSpeechEvent) {
      this.agentSpeechEvent.stop();
      this.agentSpeechEvent = undefined;
    }
    if (this.customerSpeechEvent) {
      this.customerSpeechEvent.stop();
      this.customerSpeechEvent = undefined;
    }
  }

  /**
   * @public
   * Get voice activity
   * @return {Promise<undefined>|String}
   */
  async getVoiceActivity () {
    // this.activity = {
    //   signal: 0, // agent audio volume
    //   rssi: 0, // customer audio volume
    //   timestamp: 0, // current timestamp
    //   interface: '', // current speaking state. can be 'agent speaking, customer speaking, or cross talk'
    //   noise: 0,
    //   addresses: [] // optional
    // };
    return JSON.stringify({
      signal: this.agentVolume, // agent audio volume
      rssi: this.customerVolume, // customer audio volume
      timestamp: getTimestamp(), // current timestamp
      interface: this.talkingState, // current speaking state. can be 'agent speaking, customer speaking, or cross talk'
      noise: 0,
      addresses: [] // optional
    });
  }
}

const voiceActivityMonitor = new VoiceActivityMonitor();
export default voiceActivityMonitor;
