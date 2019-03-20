import {onAgentStateChange, onAvailableStream} from "../reducers/acReducer";
import {getAgentState} from "./agenetevents";
import connectionHandler from "./connectionHandler";
import agentStateManager from './agentStateManager';

class ContactHandler {
	constructor() {
		this.dispatch = undefined;
		this.contact = undefined;
	}

	getContact() {
		return this.contact;
	}

	dispose() {
		this.dispatch = undefined;
		this.contact = undefined;
	}

	register(dispatch, contact) {
		this.dispatch && this.dispose();

		this.dispatch = dispatch;
		this.contact = contact;
		contact.destroy(() => {
			this.dispose();
		});

		contact.onEnded((e) => {
			this.contact = undefined;
		});

		// contact.onConnected(() => {
		// 	const e = Object.assign({}, {newState: 'Connected'});
		// 	const agentState = getAgentState(e);
		// 	agentStateManager.setAgentLocalState(agentState);
		// 	this.dispatch(onAgentStateChange(agentState));
		// });
		// contact.onConnecting(() => {
		// 	const e = Object.assign({}, {newState: contact.isInbound() ? 'Inbound Call' : 'Outbound Call'});
		// 	const agentState = getAgentState(e);
		// 	agentStateManager.setAgentLocalState(agentState);
		// 	this.dispatch(onAgentStateChange(agentState));
		// });
		// contact.onRefresh((e) => {
		// 	console.warn('onRefresh', e);
		// 	const activeConnection = contact.getActiveInitialConnection();
		// 	const activeThirdPartyConnection = contact.getSingleActiveThirdPartyConnection();
		// 	connectionHandler.mayBeUpdateConnection(activeConnection, true);
		// 	connectionHandler.mayBeUpdateConnection(activeThirdPartyConnection, false);
		//
		// 	this.mayBeEmitConnectionUpdate(activeConnection, activeThirdPartyConnection, contact);
		// });
		contact.onSession(session => {
			console.warn('new session ', session);
			setTimeout(() => {
				let _remoteAudioStream = session._remoteAudioStream;
				this.dispatch(onAvailableStream(_remoteAudioStream, false))
			}, 5 * 1000);
		});

		connectionHandler.register(dispatch);
	}

	isToHold(connection = undefined, contact = undefined) {
		let lastAgentState = agentStateManager.getAgentLocalState();
		return connection.isActive() && connection.isOnHold();
	}

	isFromHold(connection = undefined, contact = undefined) {
		let lastAgentState = agentStateManager.getAgentLocalState();
		return lastAgentState === 'On hold' && connection.isConnected();
	}

	mayBeEmitConnectionUpdate(activeConnection = undefined, activeThirdPartyConnection = undefined, contact = undefined) {
		if (!activeThirdPartyConnection && this.isToHold(activeConnection, contact)) {
			let lastAgentState = agentStateManager.getAgentLocalState();
			const e = Object.assign({oldState: lastAgentState, newState: 'On hold'});
			const agentState = getAgentState(e);
			agentStateManager.setAgentLocalState(agentState);
			this.dispatch(onAgentStateChange(agentState));
		} else if (!activeThirdPartyConnection && this.isFromHold(activeConnection, contact)) {
			let lastAgentState = agentStateManager.getAgentLocalState();
			const e = Object.assign({oldState: lastAgentState, newState: 'Connected'});
			const agentState = getAgentState(e);
			agentStateManager.setAgentLocalState(agentState);
			this.dispatch(onAgentStateChange(agentState));
		}
		console.warn('<<<', activeConnection && activeConnection.isOnHold(), activeThirdPartyConnection && activeThirdPartyConnection.isOnHold());
	}

	// accept a incoming call with contact
	acceptCall() {
		if (this.contact) {
			this.contact.accept({
				success: (data) => {
					console.warn('-> acceptCall', data);
				},
				failure: (data) => {
					console.error('-> acceptCall', data);
				}
			});
		}
	}

	dialContact(selectedContact = undefined) {
		return new Promise((resolve, reject) => {
			if (!this.contact) {
				reject('contact is undefined');
				return;
			}
			this.contact.addConnection(selectedContact, {
				success: function () {
					resolve('successfully added new contact');
				},
				failure: function (err, data) {
					reject({err, data});
				}
			});
		});
	}
}

const contactHandler = new ContactHandler();
export default contactHandler;
