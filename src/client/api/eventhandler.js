import {
	onCCPError,
	onRemoteStream,
	onStateChange,
} from "../reducers/acReducer";

import agentHandler from './agentHandler';

// Outbound call = connection.isActive() && connection.isConnecting() && connection.getType() === 'outbound'
// Incoming call = connection.isActive() && connection.isConnecting() && connection.getType() === 'inbound'
// Connected = connection.isActive() && connection.isConnected() && isMultipartyCall() === false;
// Joined = connection.isActive() && connection.isConnected() && isMultipartyCall();
// Hold = connection.isActive() && connection.isOnHold()
// Duration = connection.isActive() && connection.getState() && connection.getState().duration


let currentAgent;
let currentContact;
let currentState;

const agentStates = ['Init', 'Available', 'Offline', 'AfterCallWork', 'FailedConnectCustomer', 'FailedConnectAgent', 'Quality Issue'];

const isError = (e) => {
	if (e && e.errorType && e.errorMessage) {
		return true;
	}
};
const getAgentState = (e) => {
	const {agent, newState} = e;
	if (!agentStates.includes(newState)) {
		return undefined;
	}
	const duration = agent.getStateDuration();
	return {
		state: newState,
		duration: duration,
		agent: agent,
	};
};

const isMultipartyCall = (contact) => {
	return (contact && contact.getActiveInitialConnection() && contact.getSingleActiveThirdPartyConnection()) ? true : false;
};

const isOutbound = (connection) => {
	return connection && connection.isActive() && connection.isConnected() === false &&
		connection.isConnecting() === true && connection.getType() === 'outbound'
};

const isInbound = (connection) => {
	return connection && connection.isActive() && connection.isConnected() &&
		connection.getType() === 'inbound' &&
		currentAgent.agent.getState().name === 'PendingBusy';
};

const isMissedCall = (connection) => {
	return connection && connection.isActive() && connection.isConnected() &&
		connection.getType() === 'inbound' &&
		currentAgent.agent.getState().name === 'MissedCallAgent';
};

const isConnected = (connection) => {
	return connection && connection.isActive() && connection.isConnected() &&
		currentAgent.agent.getState().name === 'Busy';

};

const isJoined = (primaryConnectionState, thirdPartyConnectionState) => {
	return primaryConnectionState && thirdPartyConnectionState &&
		['connected', 'Connected'].includes(primaryConnectionState.state) &&
		primaryConnectionState.state === thirdPartyConnectionState.state;

};

const isHold = (connection) => {
	return connection && connection.isActive() && connection.isOnHold()
};

const getStateDuration = (connection) => {
	let duration = connection && connection.getStatusDuration();
	return duration;
};

const getConnectionState = (contact = undefined, isPrimary = true) => {
	const connection = isPrimary ? contact.getActiveInitialConnection() : contact.getSingleActiveThirdPartyConnection();
	if (!connection) {
		return undefined;
	}
	console.warn('~', connection.isActive(), connection.isConnected(), connection.isConnecting(), connection.getType(), currentAgent.agent.getState());
	let state = undefined;
	if (isOutbound(connection)) {
		state = 'Outbound call';
	} else if (isInbound(connection)) {
		state = 'Inbound call';
	} else if (isMissedCall(connection)) {
		state = 'Missed';
	} else if (isConnected(connection)) {
		state = 'Connected';
	} else if (isHold(connection)) {
		state = 'Hold';
	}

	let duration = getStateDuration(connection);
	return {
		state: state,
		duration: duration,
		connection: connection,
	}
};

const mayBeUpdateToJoined = (primaryConnectionState = undefined, thirdPartyConnectionState = undefined) => {
	if (isJoined(primaryConnectionState, thirdPartyConnectionState)) {
		primaryConnectionState.state = 'Joined';
		thirdPartyConnectionState.state = 'Joined';
	}
	return {
		primaryConnectionState,
		thirdPartyConnectionState,
	}
};

class EventHandler {
	constructor() {
		this.dispatch = undefined;
	}

	dispose() {
		this.dispatch = undefined;
	}

	register(dispatch, connect) {
		this.dispatch && this.dispose();
		this.dispatch = dispatch;

		if (connect && connect.core) {
			let bus = connect.core.getEventBus();

			bus.subscribe('<<all>>', e => {
				if (isError(e)) {
					this.dispatch(onCCPError({...e}));
				}
			});
			bus.subscribe(connect.AgentEvents.STATE_CHANGE, e => {
				currentAgent = e;
				console.warn('~agent state change ', getAgentState(e));
				let payload = {
					primaryConnectionState: getAgentState(e),
					thirdPartyConnectionState: undefined,
				};
				currentState = payload;
				this.dispatch(onStateChange(payload));
			});
			bus.subscribe(connect.ContactEvents.REFRESH, e => {
				currentContact = e;
				const connection1 = getConnectionState(e, true);
				const connection2 = getConnectionState(e, false);
				const {primaryConnectionState, thirdPartyConnectionState} = mayBeUpdateToJoined(connection1, connection2);
				let payload = {
					primaryConnectionState: primaryConnectionState,
					thirdPartyConnectionState: thirdPartyConnectionState,
				};
				console.warn('~REFRESH', primaryConnectionState, thirdPartyConnectionState, isMultipartyCall(e));
				//donot send state change for connection when both are null.
				//in that case use agent state
				if ((primaryConnectionState && primaryConnectionState.state) || (thirdPartyConnectionState && thirdPartyConnectionState.state)) {
					currentState = payload;
					this.dispatch(onStateChange(payload));
				} else {
					let payload = {
						primaryConnectionState: getAgentState(currentAgent),
						thirdPartyConnectionState: undefined,
					};
					currentState = payload;
					this.dispatch(onStateChange(payload));
				}
			});
			bus.subscribe(connect.ContactEvents.ENDED, () => {
				currentContact = undefined;
			});
			bus.subscribe(connect.ContactEvents.DESTROYED, () => {
				currentContact = undefined;
			});
			bus.subscribe(connect.ContactEvents.CONNECTED, e => {
				const session = agentHandler.getSession();
				if (session._remoteAudioStream) {
					this.dispatch(onRemoteStream(session._remoteAudioStream))
				}
			});
		}
	}

	getCurrentContact() {
		return currentContact;
	}

	getCurrentState() {
		return currentState;
	}
}

const eventHandler = new EventHandler();
export default eventHandler;
