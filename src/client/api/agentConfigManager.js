'use strict';

class AgentConfigManager {
	constructor() {
		this.agentConfig = undefined;
	}

	setAgentConfig(agentConfig = undefined) {
		console.warn('->', agentConfig);
		this.agentConfig = agentConfig;
	}

	getAgentConfig() {
		return this.agentConfig;
	}

	getDialableCountries() {
		const dialableCountries = this.agentConfig && this.agentConfig.dialableCountries;
		return dialableCountries || [];
	}
}

const agentConfigManager = new AgentConfigManager();
export default agentConfigManager;
