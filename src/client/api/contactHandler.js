import {onAgentStateChange} from "../reducers/acReducer";
import {getAgentState} from "./agenetevents";

class ContactHandler {
	constructor() {
		this.dispatch = undefined;
		this.contact = undefined;
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
		const currentConnection = contact.getActiveInitialConnection();
		if (!currentConnection) {
			return;
		}
	}
}

const contactHandler = new ContactHandler();
export default contactHandler;
