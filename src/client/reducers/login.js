import INITIAL_STATE from '../utils/initialStateManager';
import acManager from './../api/acManager';

export const onInitializationStateChange = (initialized = false) => {
	return {
		type: 'onInitialized',
		initialized
	};

};

export const onAgentStateChanges = (agentState = 'offline') => {
	return {
		type: 'onAgentStateChange',
		agentState
	};

};

const loginReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'onInitialized':
			return {
				...state,
				initialized: action.initialized,
			};
		case 'onAgentStateChange':
			return {
				...state,
				agentState: action.agentState,
			};
		default:
			return state;
	}
};

export default loginReducer;
