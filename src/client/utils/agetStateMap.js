import lo from 'lodash';

const colorSchema = {
	available: '#3885de',
	aftercallwork: '#666666',
	offline: '#666666',
	qualityissue: '#666666',
	connected: '#0f9a28',
	onhold: '#e07724',
	inboundcall: '#9a62cf',
	default: '#3885de',
};

export const getColorSchema = (agentState) => {
	let state = lo.lowerCase(agentState).replace(/\s/g, '');
	let color = colorSchema[state];

	// console.warn('<<', state, color);
	return color || colorSchema.default;
};
