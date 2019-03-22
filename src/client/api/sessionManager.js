import agentHandler from './agentHandler';
import acManager from './acManager';

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
	getEndpointByPhone,
} from './manager/agent';

import {
	isNeedToTransferCall,
	acceptCall,
	rejectCall,
	dialContact,
	holdAll,
	resumeAll,
	swapCall,
} from './manager/contact'

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
} from './manager/connection';


class SessionManager {
	constructor() {

	}

	isNeedToTransferCall() {
		const contact = acManager.getCurrentContact();
		return isNeedToTransferCall(contact);
	}

	// it can be simply just dialing a number
	// or can be a transfer call to another number
	dialNumber(phoneNumber = null) {
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

	getQuickConnectionList() {
		const agent = agentHandler.getAgent();
		return getQuickConnectionList(agent);
	}

	getTransferConnList() {
		const agent = agentHandler.getAgent();
		return getTransferConnList(agent);
	}

	mute() {
		const agent = agentHandler.getAgent();
		return mute(agent);
	}

	unmute() {
		const agent = agentHandler.getAgent();
		return unmute(agent);
	}

	holdConnection(connection = undefined) {
		return holdConnection(connection);
	}

	resumeConnection(connection = undefined) {
		return resumeConnection(connection);
	}

	endConnection(connection = undefined) {
		return endConnection(connection);
	}

	getPrimaryAgentState() {
		const currentState = acManager.getCurrentState();
		return getPrimaryAgentState(currentState);
	}

	getPrimaryConnectionDuration() {
		const currentState = acManager.getCurrentState();
		return getPrimaryConnectionDuration(currentState);
	}

	getThirdPartyConnectionDuration() {
		const currentState = acManager.getCurrentState();
		return getThirdPartyConnectionDuration(currentState);
	}

	getPrimaryConnectionPhone() {
		const currentState = acManager.getCurrentState();
		return getPrimaryConnectionPhone(currentState);
	}

	getThirdPartyConnectionPhone() {
		const currentState = acManager.getCurrentState();
		return getThirdPartyConnectionPhone(currentState);
	}

	getAgentStates() {
		const agent = agentHandler.getAgent();
		return agent.getAgentStates() || [];
	}

	setAgentState(agentState = undefined) {
		let agent = agentHandler.getAgent();
		return setAgentState(agent, agentState);
	}

	getAgentDeskphoneNumber() {
		let agent = agentHandler.getAgent();
		return getAgentDeskphoneNumber(agent);
	}

	isAgentSoftphoneEnabled() {
		let agent = agentHandler.getAgent();
		return isAgentSoftphoneEnabled(agent);
	}

	changeToSoftPhone() {
		let agent = agentHandler.getAgent();
		return changeToSoftPhone(agent);
	}

	changeToDeskphone(phoneNumber = null) {
		let agent = agentHandler.getAgent();
		return changeToDeskphone(agent, phoneNumber);
	}

	getDialableCountries() {
		let agent = agentHandler.getAgent();
		return getDialableCountries(agent);
	}

	setAgentAvailable() {
		let agent = agentHandler.getAgent();
		return setAgentAvailable(agent);
	}

	hangupPrimaryConnection() {
		const currentState = acManager.getCurrentState();
		return hangupPrimaryConnection(currentState);
	}

	acceptCall() {
		const currentContact = acManager.getCurrentContact();
		return acceptCall(currentContact);
	}

	rejectCall() {
		const currentContact = acManager.getCurrentContact();
		return rejectCall(currentContact);
	}

	// hangup contact, and reject are basically same
	hangupContact(){
		const currentContact = acManager.getCurrentContact();
		return rejectCall(currentContact);
	}

	dialContact(selectedContact = undefined) {
		const currentContact = acManager.getCurrentContact();
		return dialContact(currentContact, selectedContact);
	}

	holdAll() {
		const currentState = acManager.getCurrentState();
		const primaryConnection = getPrimaryConnection(currentState);
		const thirdPartyConnection = getThirdPartyConnection(currentState);
		return holdAll(holdConnection, primaryConnection, thirdPartyConnection);
	}

	resumeAll() {
		const currentContact = acManager.getCurrentContact();
		return resumeAll(currentContact);
	}

	swapCall() {
		const currentContact = acManager.getCurrentContact();
		return swapCall(currentContact);
	}

	getPrimaryConnection() {
		const currentState = acManager.getCurrentState();
		return getPrimaryConnection(currentState);
	}

	getThirdPartyConnection() {
		const currentState = acManager.getCurrentState();
		return getThirdPartyConnection(currentState);
	}


}

const sessionManage = new SessionManager();
export default sessionManage;
