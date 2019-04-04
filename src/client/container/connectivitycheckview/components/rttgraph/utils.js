const THREE_DAYS_MS = 259200000;
const ONE_HOUR = 3600000;
const UNIT_HOUR = 1 * 3600000;
const FIFTEEN_MINUTED = 15 * 60 * 1000;
// const FIVE_MINUTED = 5 * 60 * 1000;
const EVERY_THIRTY_MINUTED = 30 * 60 * 1000;
// const EVERY_MINUTED = 60 * 1000;
// const EVERY_SECOND = 2 * 60 * 1000;
const TIME_SEGMENT_MS = UNIT_HOUR;

const getRecords = (currentTime = 0, at, data = []) => {
    let last = currentTime - TIME_SEGMENT_MS;

    let throughput = [];
    for (let i = at; i >= 0; i -= 1) {
        let currentResult = data[i];
        if (currentResult.epochTime && currentResult.epochTime < last) {
            return {
                throughput: throughput,
                lastIndex: i,
            };
        }
        throughput.push(currentResult);
    }
    return {
        throughput: throughput,
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

const getMedianThroughput = (data = []) => {
    let len = data.length;
    let pivot = Math.floor(len / 2);

    let retval = len < 1 ? 0 : len % 2 !== 0 ? data[pivot].throughput : 0.5 * (data[pivot - 1].throughput + data[pivot].throughput);
    // console.warn('media', data, retval);
    return retval;
};

export const postProcess = (pctResults = []) => {
    let now = (new Date).getTime();
    let upto = now - THREE_DAYS_MS;
    let retval = [];
    for (let currentTime = now, at = pctResults.length - 1; currentTime >= upto && at >= 0; currentTime -= TIME_SEGMENT_MS) {
        let result = getRecords(currentTime, at, pctResults);

        let {throughput, lastIndex} = result;

        at = lastIndex;
        let medianThroughput = getMedianThroughput(throughput);
        let epochTime = currentTime;
        retval.push({throughput: medianThroughput, epochTime})
    }

    return retval;
};
