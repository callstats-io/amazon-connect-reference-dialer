import agentHandler from './agentHandler';
import {
	dialNumber,
	getQuickConnectionList,
	getTransferConnList,
	mute,
	unmute
} from './manager/agent';

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

}

const sessionManage = new SessionManager();
export default sessionManage;
