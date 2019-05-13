const initialStateManager = {
  initialized: false,
  requestAgentStateChange: 'unknown',
  requestAgentSettingsChange: 'unknown',
  requestReportCallIssue: 'unknown',
  requestConnectivityCheck: 'unknown',
  requestShowDialPad: 'unknown',
  requestShowQuickConnects: 'unknown',
  requestShowTransferCall: 'unknown',
  errorMessage: {}
};

const INITIAL_STATE = initialStateManager;
export default INITIAL_STATE;
