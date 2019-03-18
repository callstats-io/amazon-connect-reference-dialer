'use strict';

import agentHandler from "./agentHandler";

class AgentStateManager {
	constructor() {
		this.agentStates = [];
		this.localState = undefined;
	}

	setAgentStates(agent = undefined) {
		if (!agent) {
			return;
		}
		this.agentStates = agent.getAgentStates() || [];
	}

	setAgentLocalState(localState = undefined) {
		this.localState = localState;
	}

	getAgentLocalState() {
		return this.localState;
	}

	getAgentStates() {
		return this.agentStates || [];
	}

	getStateAsObject(stateName = '') {
		for (let currentState of this.agentStates) {
			if (stateName === currentState.name) {
				return currentState;
			}
		}
		return undefined;
	}

	// actions
	setAgentState(agentState = undefined) {
		let agent = agentHandler.getAgent();
		agentState && agent && agent.setState(agentState, {
			success: (data) => {
				console.warn('-> setAgentState', data);
			},
			failure: (data) => {
				console.error('-> setAgentState', data);
			}
		})
	}
}

const agentStateManager = new AgentStateManager();
export default agentStateManager;
