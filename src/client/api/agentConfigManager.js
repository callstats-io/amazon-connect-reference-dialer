'use strict';

class AgentConfigManager {
	constructor() {
		this.agentConfig = undefined;
	}

	setAgentConfig(agentConfig = undefined) {
		console.warn('->', 'setAgentConfig', agentConfig);
		this.agentConfig = agentConfig;
	}

	getAgentConfig() {
		return this.agentConfig;
	}

	getDialableCountries() {
		const dialableCountries = this.agentConfig && this.agentConfig.dialableCountries;
		return dialableCountries || [];
	}

	isSoftphoneEnabled() {
		const softphoneEnabled = this.agentConfig && this.agentConfig.softphoneEnabled;
		return softphoneEnabled;
	}
}

const agentConfigManager = new AgentConfigManager();
export default agentConfigManager;
