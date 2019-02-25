export const isAgentStateChanage = (e) => {
	return e && e.agent && e.newState && e.oldState;
};

export const getCSIOAgentState = (e) => {
	const curState = e.newState.toLowerCase();
	if (curState.includes("busy")) {
		return 'Connected';
	}
	if(curState.includes("callingcustomer")){
		return 'Outbound call'
	}
	return e.newState;
};
