import INITIAL_STATE from '../utils/initialStateManager';
import acManager from './../api/acManager';

export const onInitializationStateChange = (initialized = false) => {
	console.warn('-> ', 'onInitializationStateChange', initialized);
	return {
		type: 'onInitializationStateChange',
		initialized
	};

};

export const onAgentStateChange = (agentState = 'offline', duration = '00:00:00') => {
	console.warn('-> ', 'onAgentStateChange', agentState, duration);
	return {
		type: 'onAgentStateChange',
		agentState,
		duration
	};
};

export const onDurationChange = (who = undefined, duration = 0) => {
	console.warn('-> ', 'onDurationChange', who, duration);
	return {
		type: 'onDurationChange',
		duration
	};
};

const acReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'onInitializationStateChange':
			return {
				...state,
				initialized: action.initialized,
			};
		case 'onAgentStateChange':
			return {
				...state,
				agentState: action.agentState,
				duration: action.duration,
			};
		case 'onDurationChange':
			return {
				...state,
				duration: action.duration,
			};
		default:
			return state;
	}
};

export default acReducer;
