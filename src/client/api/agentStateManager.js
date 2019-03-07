'use strict';

class AgentStateMonitor {
	constructor() {
		this.agentStates = [];
	}

	setAgentStates(agentStates = []) {
		this.agentStates = agentStates;
		// this.agentStates = lo.map(agentStates, currentState => {
		// 	return {name: currentState.name};
		// });
		// console.warn('->', this.agentStates);
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
}

const agentStateMonitor = new AgentStateMonitor();
export default agentStateMonitor;
