const THREE_DAYS_MS = 259200000;
const ONE_HOUR = 3600000;
const FIFTEEN_MINUTED = 15 * 60 * 1000;
// const FIVE_MINUTED = 5 * 60 * 1000;
// const EVERY_THIRTY_MINUTED = 30 * 60 * 1000;
// const EVERY_MINUTED = 60 * 1000;
// const EVERY_SECOND = 2 * 60 * 1000;
const TIME_SEGMENT_MS = FIFTEEN_MINUTED;

const getRecords = (currentTime = 0, at, data = []) => {
	let last = currentTime - TIME_SEGMENT_MS;

	let rttList = [];
	for (let i = at; i >= 0; i -= 1) {
		let currentResult = data[i];
		if (currentResult.epochTime && currentResult.epochTime < last) {
			return {
				rttList: rttList,
				lastIndex: i,
			};
		}
		rttList.push(currentResult);
	}
	return {
		rttList: rttList,
		lastIndex: -1,
	}
};

const getMedianRTT = (data = []) => {
	let len = data.length;
	let pivot = Math.floor(len / 2);

	let retval = len < 1 ? 0 : len % 2 !== 0 ? data[pivot].rtt : 0.5 * (data[pivot - 1].rtt + data[pivot].rtt);
	// console.warn('media', data, retval);
	return retval;
};

export const postProcess = (rtts = []) => {
	let now = (new Date).getTime();
	let upto = now - THREE_DAYS_MS;
	let retval = [];
	for (let currentTime = now, at = rtts.length - 1; currentTime >= upto && at >= 0; currentTime -= TIME_SEGMENT_MS) {
		let result = getRecords(currentTime, at, rtts);

		let {rttList, lastIndex} = result;

		at = lastIndex;
		let rtt = getMedianRTT(rttList);
		let epochTime = currentTime;
		retval.push({rtt, epochTime})
	}

	return retval;
};
