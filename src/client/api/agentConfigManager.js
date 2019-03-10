'use strict';

class AgentConfigManager {
	constructor() {
		this.agentConfig = undefined;
	}

	setAgentConfig(agent = undefined) {
		if (!agent) {
			return;
		}
		this.agentConfig = agent.getConfiguration();
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

	getDeskphoneNumber() {
		const extension = this.agentConfig && this.agentConfig.extension;
		return extension;
	}

	updateAgentConfig(isSoftphone = true, phoneNumber = null) {
		let agent = agentHandler.getAgent();
		return new Promise((resolve, reject) => {
			if (agent) {
				reject('agent cannot be undefined');
				return;
			}
			if (isSoftphone) {
				let newConfig = agent.getConfiguration();
				newConfig.softphoneEnabled = true;
				agent.setConfiguration(newConfig, {
					success: function () {
						resolve(newConfig);
					},
					failure: function () {
						reject("Failed to change to softphone");
					}
				})
			} else {
				if (!phoneNumber) {
					reject('empty number');
					return;
				}
				let newConfig = agent.getConfiguration();
				newConfig.softphoneEnabled = false;
				agent.setConfiguration(newConfig, {
					success: function () {
						resolve(newConfig);
					},
					failure: function () {
						reject("Failed to change to hardphone");
					}
				})
			}
		});
	}
}

const agentConfigManager = new AgentConfigManager();
export default agentConfigManager;
