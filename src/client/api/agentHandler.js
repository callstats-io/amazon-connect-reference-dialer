import {onInitializationStateChange, onMuteToggle, onRemoteStream} from "../reducers/acReducer";

class AgentHandler {
	constructor() {
		this.dispatch = undefined;
		this.agent = undefined;
		this.session = undefined;
	}

	dispose() {
		this.dispatch = undefined;
		this.agent = undefined;
	}

	register(dispath = undefined, agent) {
		this.dispatch && this.dispose();

		this.dispatch = dispath;
		this.agent = agent;

		this.dispatch(onInitializationStateChange(true));
		agent.onMuteToggle((e) => {
			this.dispatch(onMuteToggle(e && e.muted))
		});
		//hack to get remote stream
		connect.contact(contact => {
			contact && contact.onSession(session => {
				this.session = session;
			});
		});
	}

	getAgent() {
		return this.agent;
	}

	getSession() {
		return this.session;
	}
}

const agentHandler = new AgentHandler();
export default agentHandler;
