import lo from 'lodash';

const colorSchema = {
	available: '#3885de',
	init: '#3885de',
	aftercallwork: '#666666',
	offline: '#666666',
	qualityissue: '#666666',
	connected: '#0f9a28',
	joined: '#0f9a28',
	onhold: '#e07724',
	hold: '#e07724',
	missed: '#e07724',
	missedcall: '#e07724',
	inboundcall: '#9a62cf',
	incomingcall: '#9a62cf',
	missedcallagent: '#e07724',
	failedconnectcustomer: '#e07724',
	failedconnectagent: '#e07724',
	outboundcall: '#3885de',
	default: 'red',
	error: '#ffffff'
};

export const getColorSchema = (agentState) => {
	let state = lo.lowerCase(agentState).replace(/\s/g, '');
	let color = colorSchema[state];
	return color || colorSchema.default;
};
