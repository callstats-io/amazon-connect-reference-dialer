'use strict';

import agentHandler from "./agentHandler";

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

	setCurrentConfig(agentConfig) {
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
		console.warn('-> softphoneEnabled', this.agentConfig);
		return softphoneEnabled;
	}

	getDeskphoneNumber() {
		const extension = this.agentConfig && this.agentConfig.extension;
		return extension;
	}

	changeToSoftPhone() {
		return new Promise((resolve, reject) => {
			let agent = agentHandler.getAgent();
			let newConfig = agent && agent.getConfiguration();
			newConfig.softphoneEnabled = true;
			agent.setConfiguration(newConfig, {
				success: function () {
					resolve(newConfig);
				},
				failure: function () {
					reject("Failed to change to softphone");
				}
			});
		});
	}

	changeToDeskphone(phoneNumber) {
		return new Promise((resolve, reject) => {
			if (!phoneNumber) {
				reject('empty number');
				return;
			}
			let agent = agentHandler.getAgent();
			let newConfig = agent.getConfiguration();
			newConfig.softphoneEnabled = false;
			newConfig.extension = phoneNumber;
			agent.setConfiguration(newConfig, {
				success: function () {
					resolve(newConfig);
				},
				failure: function () {
					reject("Failed to change to hardphone");
				}
			})
		});
	}

	updateAgentConfig(isSoftphone = true, phoneNumber = null) {
		if (isSoftphone) {
			return this.changeToSoftPhone();
		} else {
			return this.changeToDeskphone(phoneNumber);
		}
	}
}

const agentConfigManager = new AgentConfigManager();
export default agentConfigManager;
