import INITIAL_STATE from '../utils/initialStateManager';

export const onInitializationStateChange = (initialized = false) => {
  console.log('-> ', 'onInitializationStateChange', initialized);
  return {
    type: 'onInitializationStateChange',
    initialized
  };
};

export const onStateChange = (currentState = undefined) => {
  console.log('~', currentState);
  return {
    type: 'onStateChange',
    currentState: currentState
  };
};

export const onAgentStateChange = (agentState = 'unknown', duration = '00:00:00') => {
  return {
    type: 'onAgentStateChange',
    agentState,
    duration
  };
};

export const onCCPError = (errorMessage = {}) => {
  return {
    type: 'onCCPError',
    errorMessage
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
  };
};

// from UI events
export const onRequestAgentStateChange = (requestAgentStateChange = 'complete') => {
  // console.log('--> ', requestAgentStateChange);
  return {
    type: 'onRequestAgentStateChange',
    requestAgentStateChange
  };
};

export const onRequestAgentSettingsChange = (requestAgentSettingsChange = 'complete') => {
  return {
    type: 'onRequestAgentSettingsChange',
    requestAgentSettingsChange
  };
};

export const onFeedbackChange = (feedback = 4) => {
  return {
    type: 'onFeedbackChange',
    feedback
  };
};

export const onRequestReportCallIssue = (requestReportCallIssue = 'complete') => {
  return {
    type: 'onRequestReportCallIssue',
    requestReportCallIssue
  };
};

export const onRequestConnectivityCheck = (requestConnectivityCheck = 'complete') => {
  return {
    type: 'onRequestConnectivityCheck',
    requestConnectivityCheck
  };
};

export const onRequestShowDialPad = (requestShowDialPad = 'complete') => {
  return {
    type: 'onRequestShowDialPad',
    requestShowDialPad
  };
};

export const onRequestShowQuickConnects = (requestShowQuickConnects = 'complete') => {
  return {
    type: 'onRequestShowQuickConnects',
    requestShowQuickConnects
  };
};

export const onRequestShowTransferCall = (requestShowTransferCall = 'complete') => {
  return {
    type: 'onRequestShowTransferCall',
    requestShowTransferCall
  };
};

export const onChangeNetworkStrength = (networkStrength = 0) => {
  return {
    type: 'onChangeNetworkStrength',
    networkStrength
  };
};

export const onAudioLevelChange = (agentAudioLevel = 0, peerAudioLevel = 0) => {
  return {
    type: 'onAudioLevelChange',
    agentAudioLevel,
    peerAudioLevel
  };
};

export const onAvailableStream = (stream = undefined, isLocal = true) => {
  // console.warn('onAvailableStream', stream, isLocal);
  return {
    type: 'onAvailableStream',
    stream,
    isLocal
  };
};

export const onRemoteStream = (remoteStream = undefined) => {
  return {
    type: 'onRemoteStream',
    remoteStream
  };
};

const acReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'onInitializationStateChange':
      return {
        ...state,
        initialized: action.initialized
      };
    case 'onStateChange':
      return {
        ...state,
        currentState: action.currentState
      };
    case 'onAgentStateChange':
      return {
        ...state,
        agentState: action.agentState,
        duration: action.duration
      };
    case 'onPhoneNumber':
      return {
        ...state,
        phoneNumber: action.phoneNumber
      };
    case 'onMuteToggle':
      return {
        ...state,
        muted: action.muted
      };
    case 'onRequestAgentStateChange':
      return {
        ...state,
        requestAgentStateChange: action.requestAgentStateChange,
        requestAgentSettingsChange: 'complete',
        requestReportCallIssue: 'complete',
        requestConnectivityCheck: 'complete',
        requestShowDialPad: 'complete',
        requestShowQuickConnects: 'complete'
      };
    case 'onRequestAgentSettingsChange':
      return {
        ...state,
        requestAgentStateChange: 'complete',
        requestAgentSettingsChange: action.requestAgentSettingsChange,
        requestReportCallIssue: 'complete',
        requestConnectivityCheck: 'complete',
        requestShowDialPad: 'complete',
        requestShowQuickConnects: 'complete'
      };
    case 'onFeedbackChange':
      return {
        ...state,
        feedback: action.feedback
      };
    case 'onRequestReportCallIssue':
      return {
        ...state,
        requestAgentStateChange: 'complete',
        requestAgentSettingsChange: 'complete',
        requestReportCallIssue: action.requestReportCallIssue,
        requestConnectivityCheck: 'complete',
        requestShowDialPad: 'complete',
        requestShowQuickConnects: 'complete'
      };
    case 'onRequestConnectivityCheck':
      return {
        ...state,
        requestAgentStateChange: 'complete',
        requestAgentSettingsChange: 'complete',
        requestReportCallIssue: 'complete',
        requestConnectivityCheck: action.requestConnectivityCheck,
        requestShowDialPad: 'complete',
        requestShowQuickConnects: 'complete'
      };
    case 'onRequestShowDialPad':
      return {
        ...state,
        requestAgentStateChange: 'complete',
        requestAgentSettingsChange: 'complete',
        requestReportCallIssue: 'complete',
        requestConnectivityCheck: 'complete',
        requestShowDialPad: action.requestShowDialPad,
        requestShowQuickConnects: 'complete'
      };
    case 'onRequestShowQuickConnects':
      return {
        ...state,
        requestAgentStateChange: 'complete',
        requestAgentSettingsChange: 'complete',
        requestReportCallIssue: 'complete',
        requestConnectivityCheck: 'complete',
        requestShowDialPad: 'complete',
        requestShowQuickConnects: action.requestShowQuickConnects
      };
    case 'onRequestShowTransferCall':
      return {
        ...state,
        requestAgentStateChange: 'complete',
        requestAgentSettingsChange: 'complete',
        requestReportCallIssue: 'complete',
        requestConnectivityCheck: 'complete',
        requestShowDialPad: 'complete',
        requestShowQuickConnects: 'complete',
        requestShowTransferCall: action.requestShowTransferCall
      };
    case 'onChangeNetworkStrength':
      return {
        ...state,
        networkStrength: action.networkStrength
      };
    case 'onAudioLevelChange':
      return {
        ...state,
        agentAudioLevel: action.agentAudioLevel,
        peerAudioLevel: action.peerAudioLevel
      };
    case 'onAvailableStream':
      return {
        ...state,
        stream: action.stream,
        isLocal: action.isLocal
      };
    case 'onRemoteStream':
      return {
        ...state,
        remoteStream: action.remoteStream
      };
    case 'onCCPError':
      return {
        ...state,
        errorMessage: action.errorMessage
      };
    default:
      return state;
  }
};

export default acReducer;
