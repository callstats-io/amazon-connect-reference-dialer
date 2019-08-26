'use strict';

import Hark from 'hark';
import mediaManager from './mediaManager';
import csioHandler from './csioHandler';
import { getTimestamp } from '../utils/acutils';

const AGENT_SPEAKING = 1 << 1;
const CUSTOMER_SPEAKING = 1 << 0;
const CROSS_TALK = 0x3;
const MAX_SIZE = 20;

const blackListedDevice = ['Jabra Engage 50'];

class VoiceActivityMonitor {
  constructor () {
    this.name = 'VoiceActivityMonitor';
    this.agentSpeechEvent = undefined;
    this.customerSpeechEvent = undefined;

    this.previousActivityState = 0;
    this.eventList = [];
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
      const isBlacklisted = this.isBlackListedDevice();
      if (isBlacklisted) {
        console.warn('Omit monitoring voice detection for this device since it is done by device');
        return;
      }
      this.agentSpeechEvent = new Hark(localStream, {});
      this.customerSpeechEvent = new Hark(remoteStream, {});
      this.agentSpeechEvent.on('speaking', () => {
        this.activityMonitor(this.previousActivityState | AGENT_SPEAKING);
      });
      this.agentSpeechEvent.on('stopped_speaking', () => {
        this.activityMonitor(this.previousActivityState ^ AGENT_SPEAKING);
      });
      this.customerSpeechEvent.on('speaking', () => {
        this.activityMonitor(this.previousActivityState | CUSTOMER_SPEAKING);
      });
      this.customerSpeechEvent.on('stopped_speaking', () => {
        this.activityMonitor(this.previousActivityState ^ CUSTOMER_SPEAKING);
      });
    });
  }

  /**
   * @public
   * Stop voice activity monitor
   */
  async stopAsync () {
    this.previousActivityState = 0;
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
}

const voiceActivityMonitor = new VoiceActivityMonitor();
export default voiceActivityMonitor;
