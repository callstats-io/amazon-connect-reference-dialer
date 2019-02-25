const toStr = (num) => {
	return num < 10 ? '0' + parseInt(num) : '' + parseInt(num);
};

/*convert millisecond to hh:mm:ss*/
export const toHMS = (durationInMs) => {
	let seconds = Math.floor(durationInMs / 1000);
	let minutes = Math.floor(seconds / 60);
	seconds = seconds % 60;
	let hours = Math.floor(minutes / 60);
	minutes = minutes % 60;
	return `${toStr(hours)}:${toStr(minutes)}:${toStr(seconds)}`;
};
