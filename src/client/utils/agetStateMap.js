import lo from 'lodash';

const colorSchema = {
	available: '#3885de',
	aftercallwork: '#666666',
	offline: '#666666',
	qualityissue: '#666666',
	connected: '#0f9a28',
	onhold: '#e07724',
	inboundcall: '#9a62cf',
	missedcallagent: '#e07724',
	default: '#3885de',
	error: '#ffffff'
};

export const getColorSchema = (agentState) => {
	let state = lo.lowerCase(agentState).replace(/\s/g, '');
	let color = colorSchema[state];

	// console.warn('<<', state, color);
	return color || colorSchema.default;
};
