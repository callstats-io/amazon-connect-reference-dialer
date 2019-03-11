import lo from 'lodash';

const backgroundColors = {
	connected: '#0f9a28',
	available: '#3885de',
	outboundcall: '#3885de',
	error: '#c91922',

	offline: '#666666', /* or others */
};


const toStr = (num) => {
	return (num < 10 ? '0' : '') + parseInt(num);
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

/*convert millisecond to hh:mm:ss*/
export const toHMS = (durationInMs = 0) => {
	let seconds = Math.floor(durationInMs / 1000);
	let minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;
	let hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	return `${toStr(hours)}:${toStr(minutes)}:${toStr(seconds)}`;
};
