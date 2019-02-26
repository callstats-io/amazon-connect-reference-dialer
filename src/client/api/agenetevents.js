export const isAgentStateChange = (e) => {
	return e && e.agent && e.newState && e.oldState;
};


export const getAgentState = (e) => {
	console.warn('->', {newState: e.newState, oldState: e.oldState});
	/*	const curState = e.newState.toLowerCase();
		if (curState.includes("callingcustomer")) {
			return 'Outbound call'
		}*/
	return e.newState;
};
