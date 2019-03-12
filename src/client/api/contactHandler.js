import {onAgentStateChange, onAvailableStream} from "../reducers/acReducer";
import {getAgentState} from "./agenetevents";
import connectionHandler from "./connectionHandler";

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

		contact.onIncoming((incomingContact) => {
			console.warn('->', 'contactHandler', 'onIncoming', incomingContact);
		});
		contact.onAccepted((incomingContact) => {
			console.warn('->', 'contactHandler', 'onAccepted', incomingContact);
		});
		contact.onEnded(() => {
			console.warn('->', 'contactHandler', 'onEnded');
			this.currentConnection = undefined;
		});
		contact.onConnected(() => {
			const e = Object.assign({}, {newState: 'Connected'});
			const agentState = getAgentState(e);
			this.dispatch(onAgentStateChange(agentState));
		});
		contact.onConnecting(() => {
			const e = Object.assign({}, {newState: contact.isInbound() ? 'Inbound Call' : 'Outbound Call'});
			const agentState = getAgentState(e);
			this.dispatch(onAgentStateChange(agentState));
		});
		contact.onRefresh((e) => {
			//todo
		});
		contact.onSession(session => {
			setTimeout(() => {
				let _remoteAudioStream = session._remoteAudioStream;
				this.dispatch(onAvailableStream(_remoteAudioStream, false))
			}, 5 * 1000);
		});
		const currentConnection = contact.getActiveInitialConnection();
		if (!currentConnection) {
			return;
		}
		connectionHandler.register(dispatch, currentConnection);
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
}

const contactHandler = new ContactHandler();
export default contactHandler;
