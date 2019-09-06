import agentHandler from './agentHandler';
import acManager from './acManager';
import libphonenumber from 'google-libphonenumber';

import {
  dialNumber,
  getQuickConnectionList,
  getTransferConnList,
  mute,
  unmute,
  setAgentState,
  getAgentDeskphoneNumber,
  isAgentSoftphoneEnabled,
  changeToSoftPhone,
  changeToDeskphone,
  getDialableCountries,
  setAgentAvailable,
  getEndpointByPhone
} from './manager/agent';

import {
  isNeedToTransferCall,
  acceptCall,
  rejectCall,
  dialContact,
  holdAll,
  resumeAll,
  swapCall
} from './manager/contact';

import {
  holdConnection,
  resumeConnection,
  getPrimaryAgentState,
  getPrimaryConnectionDuration,
  getThirdPartyConnectionDuration,
  getPrimaryConnectionPhone,
  getThirdPartyConnectionPhone,
  hangupPrimaryConnection,
  getPrimaryConnection,
  getThirdPartyConnection,
  endConnection,
  sendDigit
} from './manager/connection';
import lo from 'lodash';

class SessionManager {
  constructor () {
    this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
    this.PNF = libphonenumber.PhoneNumberFormat;
    this.lastStateAsString = null;
  }

  isNeedToTransferCall () {
    const contact = acManager.getCurrentContact();
    return isNeedToTransferCall(contact);
  }

  // it can be simply just dialing a number
  // or can be a transfer call to another number
  dialNumber (phoneNumber = null) {
    if (!this.isNeedToTransferCall()) {
      // simply dial the number
      const agent = agentHandler.getAgent();
      return dialNumber(agent, phoneNumber);
    } else {
      // get the contact (endpoint) by phone number, and transfer it
      // by using addConnection method of contact using dialContact wrapper
      const agent = agentHandler.getAgent();
      return getEndpointByPhone(agent, phoneNumber).then(endpoint => {
        const currentContact = acManager.getCurrentContact();
        return dialContact(currentContact, endpoint);
      }).catch(err => {
        return new Promise((resolve, reject) => {
          reject(err);
        });
      });
    }
  }

  getQuickConnectionList () {
    const agent = agentHandler.getAgent();
    return getQuickConnectionList(agent);
  }

  getTransferConnList () {
    const agent = agentHandler.getAgent();
    return getTransferConnList(agent);
  }

  mute () {
    const agent = agentHandler.getAgent();
    return mute(agent);
  }

  unmute () {
    const agent = agentHandler.getAgent();
    return unmute(agent);
  }

  holdConnection (connection = undefined) {
    return holdConnection(connection);
  }

  resumeConnection (connection = undefined) {
    return resumeConnection(connection);
  }

  endConnection (connection = undefined) {
    return endConnection(connection);
  }

  getPrimaryAgentState () {
    const currentState = acManager.getCurrentState();
    return getPrimaryAgentState(currentState);
  }

  getPrimaryConnectionDuration () {
    const currentState = acManager.getCurrentState();
    return getPrimaryConnectionDuration(currentState);
  }

  getThirdPartyConnectionDuration () {
    const currentState = acManager.getCurrentState();
    return getThirdPartyConnectionDuration(currentState);
  }

  getPrimaryConnectionPhone () {
    const currentState = acManager.getCurrentState();
    const phoneNumber = getPrimaryConnectionPhone(currentState);
    if (phoneNumber && phoneNumber.length > 0) {
      try {
        const temp = this.phoneUtil.parse(phoneNumber, '');
        const formatPhoneNumber = this.phoneUtil.format(temp, this.PNF.INTERNATIONAL);
        return formatPhoneNumber;
      } catch (err) {
        console.warn('~', phoneNumber, err && err.message);
        return phoneNumber;
      }
    } else {
      return phoneNumber;
    }
  }

  getThirdPartyConnectionPhone () {
    const currentState = acManager.getCurrentState();
    const phoneNumber = getThirdPartyConnectionPhone(currentState);
    if (phoneNumber && phoneNumber.length > 0) {
      try {
        const temp = this.phoneUtil.parse(phoneNumber, '');
        const formatPhoneNumber = this.phoneUtil.format(temp, this.PNF.INTERNATIONAL);
        return formatPhoneNumber;
      } catch (err) {
        console.warn('~', phoneNumber, err && err.message);
        return phoneNumber;
      }
    } else {
      return phoneNumber;
    }
  }

  getAgentStates () {
    const agent = agentHandler.getAgent();
    return agent.getAgentStates() || [];
  }

  setAgentState (agentState = undefined) {
    let agent = agentHandler.getAgent();
    return setAgentState(agent, agentState);
  }

  getAgentDeskphoneNumber () {
    let agent = agentHandler.getAgent();
    return getAgentDeskphoneNumber(agent);
  }

  isAgentSoftphoneEnabled () {
    let agent = agentHandler.getAgent();
    return isAgentSoftphoneEnabled(agent);
  }

  changeToSoftPhone () {
    let agent = agentHandler.getAgent();
    return changeToSoftPhone(agent);
  }

  changeToDeskphone (phoneNumber = null) {
    let agent = agentHandler.getAgent();
    return changeToDeskphone(agent, phoneNumber);
  }

  getDialableCountries () {
    let agent = agentHandler.getAgent();
    return getDialableCountries(agent);
  }

  setAgentAvailable () {
    let agent = agentHandler.getAgent();
    return setAgentAvailable(agent);
  }

  hangupPrimaryConnection () {
    const currentState = acManager.getCurrentState();
    return hangupPrimaryConnection(currentState);
  }

  acceptCall () {
    const currentContact = acManager.getCurrentContact();
    return acceptCall(currentContact);
  }

  rejectCall () {
    const currentContact = acManager.getCurrentContact();
    return rejectCall(currentContact);
  }

  // hangup contact, and reject are basically same
  hangupContact () {
    const currentContact = acManager.getCurrentContact();
    return rejectCall(currentContact);
  }

  dialContact (selectedContact = undefined) {
    const currentContact = acManager.getCurrentContact();
    return dialContact(currentContact, selectedContact);
  }

  holdAll () {
    const currentState = acManager.getCurrentState();
    const primaryConnection = getPrimaryConnection(currentState);
    const thirdPartyConnection = getThirdPartyConnection(currentState);
    return holdAll(holdConnection, primaryConnection, thirdPartyConnection);
  }

  resumeAll () {
    const currentContact = acManager.getCurrentContact();
    return resumeAll(currentContact);
  }

  swapCall () {
    const currentContact = acManager.getCurrentContact();
    return swapCall(currentContact);
  }

  getPrimaryConnection () {
    const currentState = acManager.getCurrentState();
    return getPrimaryConnection(currentState);
  }

  getThirdPartyConnection () {
    const currentState = acManager.getCurrentState();
    return getThirdPartyConnection(currentState);
  }

  isConference (currentState = undefined) {
    return currentState && currentState.primaryConnectionState && currentState.thirdPartyConnectionState;
  }

  isOnlyPrimary (currentState = undefined) {
    return currentState && currentState.primaryConnectionState && !currentState.thirdPartyConnectionState;
  }

  getCurrentStateString (currentState = undefined, isPrimary = true) {
    const stateAsString = lo.get(currentState,
      isPrimary ? 'primaryConnectionState.state' : 'thirdPartyConnectionState.state', this.lastStateAsString);
    this.lastStateAsString = stateAsString;
    return stateAsString;
  }

  isActive (currentState = undefined) {
    const primaryConnection = this.getPrimaryConnection();
    const thirdParyConnection = this.getThirdPartyConnection();

    return (primaryConnection && primaryConnection.isActive()) || (thirdParyConnection && thirdParyConnection.isActive());
  }

  sendDigit (currentDigit = null) {
    const primaryConnection = this.getPrimaryConnection();
    const thirdParyConnection = this.getThirdPartyConnection();
    // if primary connection is active
    if (primaryConnection && primaryConnection.isActive()) {
      return sendDigit(primaryConnection, currentDigit);
    } else if (thirdParyConnection && thirdParyConnection.isActive()) {
      return sendDigit(thirdParyConnection, currentDigit);
    } else {
      return Promise.reject(new Error('no active connection'));
    }
  }

  setLoginWindow (loginWindow = undefined) {
    // current it is disposed when initialized is success from agentHandler
    agentHandler.setLoginWindow(loginWindow);
  }

  // not calling from anywhere for now
  disposeLoginWindow () {
    agentHandler.disposeLoginWindow();
  }

  getIsLoggedIn () {
    return acManager.getIsLoggedIn();
  }
}

const sessionManage = new SessionManager();
export default sessionManage;
