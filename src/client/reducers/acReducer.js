import INITIAL_STATE from '../utils/initialStateManager';

export const onInitializationStateChange = (initialized = false) => {
	console.warn('-> ', 'onInitializationStateChange', initialized);
	return {
		type: 'onInitializationStateChange',
		initialized
	};

};

export const onAgentStateChange = (agentState = 'unknown', duration = '00:00:00') => {
	return {
		type: 'onAgentStateChange',
		agentState,
		duration
	};
};

export const onDurationChange = (who = undefined, duration = 0) => {
	// console.warn('-> ', 'onDurationChange', who, duration);
	return {
		type: 'onDurationChange',
		duration
	};
};

export const onPhoneNumber = (phoneNumber = null) => {
	// console.warn('-> ', 'onPhoneNumber', who, duration);
	return {
		type: 'onPhoneNumber',
		phoneNumber
	};
};

export const onMuteToggle = (muted = false) => {
	return {
		type: 'onMuteToggle',
		muted
	}
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
		case 'onPhoneNumber':
			return {
				...state,
				phoneNumber: action.phoneNumber,
			};
		case 'onMuteToggle':
			return {
				...state,
				muted: action.muted,
			};
		default:
			return state;
	}
};

export default acReducer;
