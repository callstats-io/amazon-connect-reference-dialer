'use strict';

import audioManager from './mediaManager';
import agentHandler from './agentHandler';
import eventHandler from './eventhandler';

import csioHandler from './csioHandler';
import databaseManager from './databaseManager';

const ccpUrl = () => {
  const connectURL = databaseManager.getDefaultConnectURL(CONNECT_URL || WEB_PACK_CONNECT_URL);
  return `https://${connectURL}/connect/ccp#/`;
};

class ACManager {
  constructor () {
    console.info('ACManager initialized!');
    this.isLoggedIn = false;
    this.isInitialized = false;
    this.dispatch = undefined;
    this.onAgentInitialize = this.onAgentInitialize.bind(this);
    this.onEventHandler = this.onEventHandler.bind(this);
  }

  onAgentInitialize (agent) {
    audioManager.overWriteGetUserMedia();
    csioHandler.register(this.dispatch, agent);
    agentHandler.register(this.dispatch, agent);
  }

  onEventHandler (connect) {
    eventHandler.register(this.dispatch, connect);
  }

  register (dispatch = undefined) {
    this.dispatch = dispatch;
    if (this.isInitialized) {
      return;
    }
    this.isInitialized = true;
    const containerDiv = document.getElementById('containerDiv');
    connect.core.initCCP(containerDiv, {
      ccpUrl: ccpUrl(),
      loginPopup: false,
      softphone: {
        allowFramedSoftphone: false
      }
    });
    connect.core.initSoftphoneManager({ allowFramedSoftphone: true });
    connect.agent((agent) => {
      this.onAgentInitialize(agent);
    });
    this.onEventHandler(connect);
  }

  downloadACLog () {
    if (connect) {
      connect.getLog().download();
    }
  }

  getCurrentContact () {
    return eventHandler.getCurrentContact();
  }

  getCurrentState () {
    return eventHandler.getCurrentState();
  }

  setIsLoggedIn (isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
  }
  getIsLoggedIn () {
    return this.isLoggedIn;
  }
}

const acManager = new ACManager();
export default acManager;
