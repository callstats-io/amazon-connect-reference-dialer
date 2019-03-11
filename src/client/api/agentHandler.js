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

	dialNumber(phoneNumber = null) {
		return new Promise((resolve, reject) => {
			if (!phoneNumber) {
				reject('empty number');
				return;
			}
			if (!this.agent) {
				reject('agent cannot be undefined');
				return;
			}
			const endpoint = connect.Endpoint.byPhoneNumber(phoneNumber);
			this.agent.connect(endpoint, {
				success: function () {
					resolve("Successfully sent outbound call")
				},
				failure: function (err) {
					reject(err);
				}
			});
		});
	}

	mute(){
		if(this.agent){
			this.agent.mute();
		}
	}

	unmute(){
		if(this.agent){
			this.agent.unmute();
		}
	}

}

const agentHandler = new AgentHandler();
export default agentHandler;
