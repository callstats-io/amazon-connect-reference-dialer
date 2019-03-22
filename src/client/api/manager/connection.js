import lo from 'lodash';
import {
	toHMS
} from './../../utils/acutils'

export const holdConnection = (connection) => {
	return new Promise((resolve, reject) => {
		if (!connection) {
			reject('connection is empty');
			return;
		}
		connection.hold({
			success: function () {
				resolve(null);
			},
			failure: function () {
				reject('failed');
			}
		});

	});
};

export const resumeConnection = (connection) => {
	return new Promise((resolve, reject) => {
		if (!connection) {
			reject('connection is empty');
			return;
		}
		connection.resume({
			success: function () {
				resolve(null);
			},
			failure: function () {
				reject('failed');
			}
		});

	});
};

export const getPrimaryAgentState = (currentState = undefined) => {
	const state = lo.get(currentState, 'primaryConnectionState.state', 'none');
	return state;
};

export const getPrimaryConnectionDuration = (currentState = undefined) => {
	const primaryConnection = lo.get(currentState, 'primaryConnectionState', undefined);
	if (!primaryConnection) {
		return "00:00:00";
	}
	let duration = 0;
	// if this is a agent
	if (primaryConnection.agent) {
		duration = typeof primaryConnection.agent.getStateDuration === 'function' && primaryConnection.agent.getStateDuration();
	} else if (primaryConnection.connection) {
		duration = typeof primaryConnection.connection.getStatusDuration === 'function' && primaryConnection.connection.getStatusDuration();
	}
	return toHMS(duration || 0);
};

export const getThirdPartyConnectionDuration = (currentState = undefined) => {
	const thirdPartyConnection = lo.get(currentState, 'thirdPartyConnectionState', undefined);
	if (!thirdPartyConnection) {
		return "00:00:00";
	}
	let duration = 0;
	if (thirdPartyConnection.connection) {
		duration = typeof thirdPartyConnection.connection.getStatusDuration === 'function' && thirdPartyConnection.connection.getStatusDuration();
	}
	return toHMS(duration || 0);
};

// can be a phone or something else
export const getPrimaryConnectionPhone = (currentState = undefined) => {
	const primaryConnection = lo.get(currentState, 'primaryConnectionState', undefined);
	const connection = primaryConnection && (primaryConnection.agent || primaryConnection.connection);
	const address = connection && typeof connection.getAddress === 'function' && connection.getAddress();

	let number = (address && address.phoneNumber) || "";
	// don't show sip number
	if (number.includes("sip")) {
		return "";
	} else {
		return number;
	}
};

export const getThirdPartyConnectionPhone = (currentState = undefined) => {
	const thirdPartyConnection = lo.get(currentState, 'thirdPartyConnectionState', undefined);
	const connection = thirdPartyConnection && thirdPartyConnection.connection;
	const address = connection && typeof connection.getAddress === 'function' && connection.getAddress();

	let number = (address && address.phoneNumber) || "";
	// don't show sip number
	if (number.includes("sip")) {
		return "";
	} else {
		return number;
	}
};

export const hangupPrimaryConnection = (currentState = undefined) => {
	const primaryConnection = lo.get(currentState, 'primaryConnectionState', undefined);
	const connection = primaryConnection.agent || primaryConnection.connection;
	return new Promise((resolve, reject) => {
		if (!connection) {
			reject('connection is null');
			return;
		}
		connection.destroy({
			success: () => {
				resolve('successfully hangup primary connection')
			},
			failure: (data) => {
				reject(data)
			}
		});
	});
};


export const getPrimaryConnection = (currentState = undefined) => {
	if (!currentState) {
		return undefined;
	}

	const connection = lo.get(currentState, 'primaryConnectionState.connection', undefined);
	return connection;
};

export const getThirdPartyConnectionState = (currentState = undefined) => {
	if (!currentState) {
		return undefined;
	}

	const connection = lo.get(currentState, 'thirdPartyConnectionState.connection', undefined);
	return connection;
};
