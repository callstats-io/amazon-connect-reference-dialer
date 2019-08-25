'use strict';

import Hark from 'hark';
import mediaManager from './mediaManager';
import csioHandler from './csioHandler';

const AGENT_SPEAKING = 1 << 1;
const CUSTOMER_SPEAKING = 1 << 0;
const CROSS_TALK = 0x3;

class VoiceActivityMonitor {
  constructor () {
    this.name = 'VoiceActivityMonitor';
    this.agentSpeechEvent = undefined;
    this.customerSpeechEvent = undefined;

    this.previousActivityState = 0;
  }

  /**
   * A state that contains whether agent and customer is talking or not
   * @param speakingState
   */
  activityMonitor (speakingState = 0) {
    if (speakingState === CROSS_TALK && this.previousActivityState !== CROSS_TALK) {
      csioHandler.sendCustomVoiceActivity('crossTalkStart');
    } else if (speakingState !== CROSS_TALK && this.previousActivityState === CROSS_TALK) {
      csioHandler.sendCustomVoiceActivity('crossTalkStop');
    } else if (speakingState === AGENT_SPEAKING && this.previousActivityState !== AGENT_SPEAKING) {
      csioHandler.sendCustomVoiceActivity('agentSpeakingStart');
    } else if (speakingState !== AGENT_SPEAKING && this.previousActivityState === AGENT_SPEAKING) {
      csioHandler.sendCustomVoiceActivity('agentSpeakingStop');
    } else if (speakingState === CUSTOMER_SPEAKING && this.previousActivityState !== CUSTOMER_SPEAKING) {
      csioHandler.sendCustomVoiceActivity('contactSpeakingStart');
    } else if (speakingState !== CUSTOMER_SPEAKING && this.previousActivityState === CUSTOMER_SPEAKING) {
      csioHandler.sendCustomVoiceActivity('contactSpeakingStop');
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
    const localStream = mediaManager.getLocalStream();
    const remoteStream = mediaManager.getRemoteStream();
    console.warn('coming here ', localStream, remoteStream);
    if (!(localStream && remoteStream)) {
      return undefined;
    }
    this.stopAsync().then(async () => {
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
  stop () {
    this.previousActivityState = 0;
    if (this.agentSpeechEvent) {
      this.agentSpeechEvent.stop();
      this.agentSpeechEvent = undefined;
    }
    if (this.customerSpeechEvent) {
      this.customerSpeechEvent.stop();
      this.customerSpeechEvent = undefined;
    }
  }
  async stopAsync () {
    this.previousActivityState = 0;
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
