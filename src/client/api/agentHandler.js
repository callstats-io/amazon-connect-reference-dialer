import {onInitializationStateChange, onMuteToggle} from "../reducers/acReducer";
import agentStateManager from "./agentStateManager";
import agentConfigManager from "./agentConfigManager";

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

		agent.onOffline(() => {
			console.warn('->', 'agentHandler', 'onOffline');
		});
		agent.onError(() => {
			console.warn('->', 'agentHandler', 'onError');
		});
		agent.onMuteToggle((e) => {
			this.dispatch(onMuteToggle(e && e.muted))
		});
		agent.onRefresh((e) => {
			//todo
		});
		// store current agent states
		agentStateManager.setAgentStates(agent);
		// store current agent configuration
		agentConfigManager.setAgentConfig(agent);
	}

	getAgent() {
		return this.agent;
	}
}

const agentHandler = new AgentHandler();
export default agentHandler;
