const qualityRating = {
	excellent: 5,
	good: 4,
	fair: 3,
	poor: 2,
	bad: 1,
};

const MAX_VALUE = 1023456789;
const throughputthreshold = [
	{threshold: 8, qualityRating: 1,},
	{threshold: 15, qualityRating: 2,},
	{threshold: 25, qualityRating: 3,},
	{threshold: 30, qualityRating: 4,},
	{threshold: MAX_VALUE, qualityRating: 5},
];

export const throughputThreshold = (audioThroughput) => {
	for (let i = 0; i < throughputthreshold.length; i += 1) {
		let currentQuality = throughputthreshold[i];
		if (audioThroughput < currentQuality.threshold) {
			return currentQuality.qualityRating; // zero based indexing
		}
	}
	return 0; // unknown quality
};

export const qualityAsString = (nextworkStrength) => {
	switch (nextworkStrength) {
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
