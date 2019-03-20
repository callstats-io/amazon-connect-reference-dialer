import lo from 'lodash';

export const isAgentStateChange = (e) => {
	return e && e.agent && e.newState && e.oldState;
};

export const isCallOnHoldUnhold = (e) => {
	return e && e.name && (['holdConnection', 'resumeConnection', 'createAdditionalConnection'].includes(e.name));
};


export const getAgentState = (e) => {
	console.warn('->', {newState: e.newState, oldState: e.oldState});
	/*	const curState = e.newState.toLowerCase();
		if (curState.includes("callingcustomer")) {
			return 'Outbound call'
		}*/
	return e.newState;
};

export const isError = (e) => {
	if (e && e.errorType && e.errorMessage) {
		return true;
	}
};

export const getAgentStateForHoldUnhold = (e, contact = undefined) => {
	const currentState = e.name;
	if (currentState === 'holdConnection' || currentState === 'createAdditionalConnection' ) {
		return {
			newState: 'On hold',
			oldState: contact && contact.getStatus().type,
		}
	} else if (currentState === 'resumeConnection') {
		return {
			newState: contact && lo.capitalize(contact.getStatus().type),
			oldState: 'On hold'
		}
	}
	return {newState: 'unknown'};
};
