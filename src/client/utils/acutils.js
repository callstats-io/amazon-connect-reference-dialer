import lo from "lodash";

const toStr = (num) => {
    return (num < 10 ? '0' : '') + parseInt(num);
};

/*convert millisecond to hh:mm:ss*/
export const toHMS = (durationInMs = 0) => {
    let seconds = Math.floor(durationInMs / 1000);
    let minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${toStr(hours)}:${toStr(minutes)}:${toStr(seconds)}`;
};

export const sleep = (ms = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
};

export const runPCT = (currentAgentStateName = undefined) => {
    return ['Available', 'Offline'].includes(currentAgentStateName);
};

export const isConnected = (currentState = "") => {
    return ['Connected', 'Joined', 'On hold', 'Hold'].includes(currentState);
};

export const isConferenceConnected = (currentState = "") => {
    return ['Join', 'Joined', 'Connected'].includes(currentState);
};

export const showPhoneNumber = (currentState = "") => {
    return ['Connected', 'Joined', 'Inbound call', 'Outbound call', 'On hold', 'Hold'].includes(currentState);
};

export const showRemoteAudio = (currentState = "") => {
    return ['Connected', 'Joined', 'On hold', 'Hold'].includes(currentState);
};

export const showHoldOrMute = (currentStateAsString = undefined) => {
    return ['Connected', 'Joined', 'On hold', 'Hold'].includes(currentStateAsString);
};

export const dialOrQuickConnectOrTransfer = (currentStateAsString = undefined) => {
    return ['Inbound call', 'Outbound call'].includes(currentStateAsString) === false;
};

export const isAfterCallWork = (currentStateAsString = undefined) => {
    return ['AfterCallWork'].includes(currentStateAsString);
};

export const isHold = (currentStateAsString = undefined) => {
    // 'Hold', 'hold', 'On hold'
    return ['On hold', 'Hold', 'hold'].includes(currentStateAsString);
};

// ['Join', 'Joined', 'Connected'].includes(state);
export const isJoined = (currentStateAsString = undefined) => {
    return ['Join', 'Joined'].includes(currentStateAsString);
};


export const transferCall = (currentStateAsString = undefined) => {
    return ['Connected', 'Joined', 'On hold', 'Hold'].includes(currentStateAsString);
};
