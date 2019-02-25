const backgroundColors = {
	connected: '#0f9a28',
	available: '#3885de',
	outboundcall: '#3885de',
	error: '#c91922',

	offline: '#666666', /* or others */
};

export const getStateColor = (curState) => {
	curState = curState && curState.toLowerCase();
	if (curState.includes('connected')) {
		return backgroundColors.connected;
	}
	if (curState.includes('available')) {
		return backgroundColors.available;
	}
	if (curState.includes('outbound call')) {
		return backgroundColors.outboundcall;
	}
	if (curState.includes('error')) {
		return backgroundColors.error;
	}
	return backgroundColors.offline;
};
