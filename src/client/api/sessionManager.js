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
} from './manager/agent';

import {
	holdConnection,
	resumeConnection,
	getPrimaryAgentState,
	getPrimaryConnectionDuration,
	getPrimaryConnectionPhone,
} from './manager/connection';

class SessionManager {
	constructor() {

	}

	dialNumber(phoneNumber = null) {
		const agent = agentHandler.getAgent();
		return dialNumber(agent, phoneNumber);
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

	getPrimaryAgentState() {
		const currentState = acManager.getCurrentState();
		return getPrimaryAgentState(currentState);
	}

	getPrimaryConnectionDuration() {
		const currentState = acManager.getCurrentState();
		return getPrimaryConnectionDuration(currentState);
	}

	getPrimaryConnectionPhone() {
		const currentState = acManager.getCurrentState();
		return getPrimaryConnectionPhone(currentState);
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

}

const sessionManage = new SessionManager();
export default sessionManage;
