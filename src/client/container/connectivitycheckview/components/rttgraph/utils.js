import lo from "lodash";

const ONE_MINUTE_IN_MS = 60000;
const ONE_HOUR_IN_MS = 3600000;
const ONE_DAY_IN_MS = 86400000;
const THREE_DAYS_MS = 259200000;
const STEP_SIZE = 5;

const getRecords = (currentTime = 0, at, data = [], timeSegmentInMs = ONE_DAY_IN_MS) => {
    let last = currentTime - timeSegmentInMs;

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
    // console.warn('-> ', throughput);
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


const getTimeRange = (first = {}, last = {}) => {
    let startTimeInMs = lo.get(first, 'epochTime', 0);
    let endTimeInMs = lo.get(last, 'epochTime', 0);
    let diffInMs = Math.abs(startTimeInMs - endTimeInMs);
    let unit = 'day';
    if (diffInMs <= ONE_HOUR_IN_MS) {
        unit = 'minute';
    } else if (diffInMs <= ONE_DAY_IN_MS) {
        unit = 'hour';
    }
    return {now: endTimeInMs, upto: startTimeInMs, unit};
};

export const postProcess = (pctResult = []) => {
    // let now = (new Date).getTime();
    let retval = [];

    let {now, upto, unit} = getTimeRange(lo.first(pctResult), lo.last(pctResult));
    // console.warn(now, upto, now-THREE_DAYS_MS)
    upto = Math.max(now - THREE_DAYS_MS, upto);

    let diffInMs = Math.abs(now - upto);
    let timeSegmentInMs = diffInMs / 15;

    // console.warn('-> ', timeSegmentInMs);
    let prvIndex = pctResult.length;
    retval.push({throughput: lo.first(pctResult).throughput || 0, epochTime: now});
    for (let currentTime = now, at = prvIndex - 1; currentTime >= upto && at >= 0; currentTime -= timeSegmentInMs) {
        let result = getRecords(currentTime, at, pctResult, timeSegmentInMs);

        let {throughput, lastIndex} = result;

        // if (prvIndex === lastIndex) {
        //     continue;
        // }
        prvIndex = lastIndex;
        at = lastIndex;
        let medianThroughput = getMedianThroughput(throughput);
        let epochTime = currentTime;

        // console.warn('->', result, medianThroughput, epochTime, medianThroughput);
        retval.push({throughput: medianThroughput, epochTime})
    }
    retval = retval.sort((l, r) => {
        return l.epochTime < r.epochTime ? -1 : l.epochTime > r.epochTime ? 1 : 0;
    });

    return {pctResult: retval, unit, stepSize: timeSegmentInMs};
};
