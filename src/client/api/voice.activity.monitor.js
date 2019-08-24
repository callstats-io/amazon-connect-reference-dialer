'use strict';

import Hark from 'hark';
import mediaManager from './mediaManager';
import { sleep } from '../utils/acutils';

const AGENT_SPEAKING = 1 << 1;
const CUSTOMER_SPEAKING = 1 << 0;

class VoiceActivityMonitor {
  constructor () {
    this.name = 'VoiceActivityMonitor';
    this.agentSpeechEvent = undefined;
    this.customerSpeechEvent = undefined;

    this.speaking = 0;
  }

  /**
   * A state that contains whether agent and customer is talking or not
   * @param speakingState
   */
  activityMonitor (speakingState = 0) {
    this.speaking = speakingState;
    const agentSpeaking = !!(speakingState & AGENT_SPEAKING);
    const customerSpeaking = !!(speakingState & CUSTOMER_SPEAKING);
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
    if (!(localStream && remoteStream)) {
      return undefined;
    }
    this.stopSync().then(async () => {
      this.customerSpeechEvent = new Hark(remoteStream, {});
      this.agentSpeechEvent = new Hark(localStream, {});
      this.agentSpeechEvent.on('speaking', () => {
        this.activityMonitor(this.speaking | AGENT_SPEAKING);
      });
      this.agentSpeechEvent.on('stopped_speaking', () => {
        this.activityMonitor(this.speaking ^ AGENT_SPEAKING);
      });
      this.customerSpeechEvent.on('speaking', () => {
        this.activityMonitor(this.speaking | CUSTOMER_SPEAKING);
      });
      this.customerSpeechEvent.on('stopped_speaking', () => {
        this.activityMonitor(this.speaking ^ CUSTOMER_SPEAKING);
      });
    });
  }

  /**
   * @public
   * Stop voice activity monitor
   */
  stop () {
    console.warn('stopping hark monitor');
    this.speaking = 0;
    if (this.agentSpeechEvent) {
      this.agentSpeechEvent.stop();
      this.agentSpeechEvent = undefined;
    }
    if (this.customerSpeechEvent) {
      this.customerSpeechEvent.stop();
      this.customerSpeechEvent = undefined;
    }
  }
  async stopSync () {
    console.warn('stopping hark monitor');
    this.speaking = 0;
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
