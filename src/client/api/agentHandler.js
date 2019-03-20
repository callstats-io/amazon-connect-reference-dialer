import {onInitializationStateChange, onMuteToggle} from "../reducers/acReducer";
class AgentHandler {
	constructor() {
		this.dispatch = undefined;
		this.agent = undefined;
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
	}

	getAgent() {
		return this.agent;
	}

}

const agentHandler = new AgentHandler();
export default agentHandler;
