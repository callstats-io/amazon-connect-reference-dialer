export const isAgentStateChanage = (e) => {
	return e && e.agent && e.newState && e.oldState;
};
