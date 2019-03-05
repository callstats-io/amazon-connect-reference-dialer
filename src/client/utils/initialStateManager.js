const initialStateManager = {
	initialized: false,
	requestAgentStateChange: 'unknown',
	requestAgentSettingsChange: 'unknown',
	requestReportCallIssue: 'unknown',
	requestConnectivityCheck: 'unknown',
	networkStrength: 0,
	agentAudioLevel: 0,
	peerAudioLevel: 0,
};

const INITIAL_STATE = initialStateManager;
export default INITIAL_STATE;
