import {
	onCCPError,
	onStateChange,
} from "../reducers/acReducer";

import {
	isError
} from "./agenetevents";

// Outbound call = connection.isActive() && connection.isConnecting() && connection.getType() === 'outbound'
// Incoming call = connection.isActive() && connection.isConnecting() && connection.getType() === 'inbound'
// Connected = connection.isActive() && connection.isConnected() && isMultipartyCall() === false;
// Joined = connection.isActive() && connection.isConnected() && isMultipartyCall();
// Hold = connection.isActive() && connection.isOnHold()
// Duration = connection.isActive() && connection.getState() && connection.getState().duration


let currentContact;
const agentStates = ['Init', 'Available', 'Offline', 'AfterCallWork', 'FailedConnectCustomer'];
const getAgentState = (e) => {
	const {agent, newState} = e;
	if (!agentStates.includes(newState)) {
		return undefined;
	}
	const duration = agent.getStateDuration();
	return {
		state: newState,
		duration: duration,
	};
};

const isMultipartyCall = (contact) => {
	return contact && contact.getActiveInitialConnection() && contact.getSingleActiveThirdPartyConnection();
};

const isOutbound = (connection) => {
	return connection && connection.isActive() && connection.isConnecting() && connection.getType() === 'outbound'
};

const isInbound = (connection) => {
	return connection && connection.isActive() && connection.isConnecting() && connection.getType() === 'inbound'
};

const isConnected = (connection) => {
	return connection && connection.isActive() && connection.isConnected();
};

const isJoined = (primaryConnectionState, thirdPartyConnectionState) => {
	return primaryConnectionState && thirdPartyConnectionState &&
		primaryConnectionState.state === 'connected' &&
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

	let state = undefined;
	if (isOutbound(connection)) {
		state = 'Outbound call';
	} else if (isInbound(connection)) {
		state = 'Incoming call';
	} else if (isConnected(connection)) {
		state = 'Connected';
	} else if (isHold(connection)) {
		state = 'Hold';
	}

	let duration = getStateDuration(connection);
	return {
		state: state,
		duration: duration,
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
				console.warn('~agent state change ', getAgentState(e));
				let payload = {
					primaryConnectionState: getAgentState(e),
					thirdPartyConnectionState: undefined,
				};
				this.dispatch(onStateChange(payload));
			});
			bus.subscribe(connect.ContactEvents.REFRESH, e => {
				currentContact = e;
				const connection1 = getConnectionState(e, true);
				const connection2 = getConnectionState(e, false);
				const {primaryConnectionState, thirdPartyConnectionState} = mayBeUpdateToJoined(connection1, connection2);
				console.warn('~REFRESH', primaryConnectionState, thirdPartyConnectionState);
				let payload = {
					primaryConnectionState: primaryConnectionState,
					thirdPartyConnectionState: thirdPartyConnectionState,
				};
				this.dispatch(onStateChange(payload));
			});
			bus.subscribe(connect.ContactEvents.ENDED, () => {
				currentContact = undefined;
			});
			bus.subscribe(connect.ContactEvents.DESTROYED, () => {
				currentContact = undefined;
			});
			bus.subscribe(connect.ContactEvents.SESSION, (session) => {
				const remoteStream = session._remoteAudioStream;
				console.warn('~', 'onRemoteStream', remoteStream);
			});
		}
	}

	getCurrentContact() {
		return currentContact;
	}
}

const eventHandler = new EventHandler();
export default eventHandler;
