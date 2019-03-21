import agentHandler from './agentHandler';
import {
	dialNumber,
	getQuickConnectionList,
	getTransferConnList,
	mute,
	unmute
} from './manager/agent';

import {
	holdConnection,
	resumeConnection,
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

}

const sessionManage = new SessionManager();
export default sessionManage;
