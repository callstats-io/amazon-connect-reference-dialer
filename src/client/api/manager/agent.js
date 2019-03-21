import agentHandler from "../agentHandler";

export const getQuickConnectionList = (agent = undefined) => {
	return new Promise((resolve, reject) => {
		if (!agent) {
			resolve([]);
			return;
		}
		agent.getEndpoints(agent.getAllQueueARNs(),
			{
				success: data => {
					let endpoints = data.endpoints || [];
					let quickConnects = endpoints.filter(item => {
						return item.type === 'phone_number';
					});
					resolve(quickConnects);
				},
				failure: err => {
					reject('failed to get quick connection list');
				}
			}
		)
	});
};

export const getTransferConnList = (agent = undefined) => {
	return new Promise((resolve, reject) => {
		if (!agent) {
			resolve([]);
			return;
		}

		agent.getEndpoints(agent.getAllQueueARNs(),
			{
				success: data => {
					let endpoints = data.endpoints || [];
					resolve(endpoints);
				},
				failure: err => {
					reject('failed to get transfer connection list');
				}
			}
		)
	});
};

export const dialNumber = (agent = undefined, phoneNumber = null) => {
	return new Promise((resolve, reject) => {
		if (!phoneNumber) {
			reject('empty number');
			return;
		}
		if (!agent) {
			reject('agent cannot be undefined');
			return;
		}
		const endpoint = connect.Endpoint.byPhoneNumber(phoneNumber);
		agent.connect(endpoint, {
			success: function () {
				resolve("Successfully sent outbound call")
			},
			failure: function (err) {
				reject(err);
			}
		});
	});
};

export const mute = (agent = undefined) => {
	if (agent) {
		agent.mute();
	}
};

export const unmute = (agent = undefined) => {
	if (agent) {
		agent.unmute();
	}
};

export const setAgentState = (agent = undefined, agentState) => {
	return new Promise((resolve, reject) => {
		agentState && agent && agent.setState(agentState, {
			success: (data) => {
				resolve('success');
			},
			failure: (data) => {
				reject(data);
			}
		})
	});
};


export const getAgentDeskphoneNumber = (agent = undefined) => {
	if (!agent) {
		return "";
	}
	const agentConfig = agent.getConfiguration();
	const extension = agentConfig && agentConfig.extension;
	return extension;
};

export const isAgentSoftphoneEnabled = (agent = undefined) => {
	if (!agent) {
		return false;
	}
	const agentConfig = agent.getConfiguration();
	const softphoneEnabled = agentConfig && agentConfig.softphoneEnabled;
	return softphoneEnabled;
};

export const changeToSoftPhone = (agent = undefined) => {
	return new Promise((resolve, reject) => {
		if (!agent) {
			reject('agent cannot be undefined');
			return;
		}
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
};

export const changeToDeskphone = (agent = undefined, phoneNumber = null) => {
	return new Promise((resolve, reject) => {
		if (!phoneNumber) {
			reject('empty number');
			return;
		}
		if (!agent) {
			reject('agent cannot be undefined');
			return;
		}
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
};


export const getDialableCountries = (agent = undefined) => {
	if (!agent) {
		return [];
	}
	let agentConfig = agent.getConfiguration();
	const dialableCountries = agentConfig && agentConfig.dialableCountries;
	return dialableCountries;
};

export const setAgentAvailable = (agent = undefined) => {
	return new Promise((resolve, reject) => {
		if (!agent) {
			reject('agent cannot be undefined');
			return;
		}
		const agentState = agent.getAgentStates().find(item => item.name === 'Available');
		agent && agent.setState(agentState, {
			success: (data) => {
				console.warn('-> setAgentState', data);
			},
			failure: (data) => {
				console.error('-> setAgentState', data);
			}
		})
	});

};
