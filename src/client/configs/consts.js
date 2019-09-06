// eslint-disable-next-line no-unused-vars

export function checkForNan (value) {
  return isNaN(value) ? null : value;
}

export function isNaNOrUndefined (value) {
  return value !== undefined && checkForNan(value) !== null;
}

const qualityRating = {
  excellent: 5,
  good: 4,
  fair: 3,
  poor: 2,
  bad: 1
};

/* const MAX_VALUE = 1023456789;
const throughputthreshold = [
  { threshold: 8, qualityRating: 1 },
  { threshold: 15, qualityRating: 2 },
  { threshold: 25, qualityRating: 3 },
  { threshold: 30, qualityRating: 4 },
  { threshold: MAX_VALUE, qualityRating: 5 }
]; */

export const qualityAsString = (nextworkStrength) => {
  switch (nextworkStrength) {
    case -1:
      return 'loading';
    case 1:
      return 'bad';
    case 2:
      return 'poor';
    case 3:
      return 'fair';
    case 4:
      return 'good';
    case 5:
      return 'excellent';
  }
  return 'Unknown';
};

export const throughputThreshold2 = {
  audio: {
    green: 30,
    red: 8
  }
};

export const rttThreshold = {
  audio: {
    green: 400,
    red: 1000
  }
};

export const fractionalLossThreshold = {
  audio: {
    green: 0.15,
    red: 0.30
  }
};

export const avQualityRatings = {
  excellent: 'excellent',
  fair: 'fair',
  bad: 'bad',
  unknown: 'unknown'
};

export function getDescendentRating (value, thresholds) {
  if (thresholds.green <= value) {
    return avQualityRatings.excellent;
  }
  if (thresholds.red < value) {
    return avQualityRatings.fair;
  }
  return avQualityRatings.bad;
}

export function getAscendingRating (value, thresholds) {
  let result;
  if (thresholds.red < value) {
    result = avQualityRatings.bad;
  } else if (thresholds.green <= value) {
    result = avQualityRatings.fair;
  } else {
    result = avQualityRatings.excellent;
  }
  return result;
}

export function fromQualityString (qualityString = avQualityRatings.unknown) {
  switch (qualityString) {
    case avQualityRatings.bad:
      return qualityRating.bad;
    case avQualityRatings.fair:
      return qualityRating.fair;
    case avQualityRatings.excellent:
      return qualityRating.excellent;
  }
  return 0;
}

export function toQualityString (_qualityRating = qualityRating.excellent) {
  switch (_qualityRating) {
    case qualityRating.excellent:
      return avQualityRatings.excellent;
    case qualityRating.good:
      return avQualityRatings.fair;
    case qualityRating.fair:
      return avQualityRatings.fair;
    case qualityRating.poor:
      return avQualityRatings.fair;
    case qualityRating.bad:
      return avQualityRatings.bad;
  }
  return avQualityRatings.unknown;
}

function getOverallTrackQuality (qualities = []) {
  let totalWeight = 0;
  let result = 0;
  for (let i = 0, len = qualities.length; i < len; i += 1) {
    let curQuality = qualities[i];
    totalWeight += curQuality.weight;
  }
  for (let i = 0, len = qualities.length; i < len; i += 1) {
    let curQuality = qualities[i];
    result += (curQuality.result * curQuality.weight) / Math.max(totalWeight, 1);
  }
  result = Math.floor(result);
  // let qualityString = this.toQualityString(result);
  return result;
}

export function getQuality (bitrate, rtt, fl) {
  let bitrateQualityRating = getDescendentRating(bitrate, throughputThreshold2.audio);
  let rttQualityRating = getAscendingRating(rtt, rttThreshold.audio);
  let flQualityRating = getAscendingRating(fl, fractionalLossThreshold.audio);

  let qualities = [];
  if (!isNaNOrUndefined(bitrateQualityRating)) {
    qualities.push({ result: fromQualityString(bitrateQualityRating), weight: 1 });
  }
  if (!isNaNOrUndefined(rttQualityRating)) {
    qualities.push({ result: fromQualityString(rttQualityRating), weight: 1 });
  }
  if (!isNaNOrUndefined(flQualityRating)) {
    qualities.push({ result: fromQualityString(flQualityRating), weight: 1 });
  }

  // console.warn('-> ', bitrate, rtt, fl, qualities);
  return getOverallTrackQuality(qualities);
}
