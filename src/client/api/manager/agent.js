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

export const setAgentState = (agent, agentState) => {
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
