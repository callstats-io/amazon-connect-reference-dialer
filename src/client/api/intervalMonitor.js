import {onChangeNetworkStrength, onDurationChange} from "../reducers/acReducer";
import {toHMS} from "../utils/acutils";
import networkStrengthMonitor from "./networkStrengthMonitor";
import agentHandler from "./agentHandler";

const timeInMs = 1 * 1000;

class IntervalMonitor {
	constructor() {
		this.intervalId = undefined;
		this.dispatch = undefined;
		this.mayBeUpdate = this.mayBeUpdate.bind(this);
	}


	mayBeUpdate() {
		const agent = agentHandler.getAgent();
		if (agent && typeof agent.getStateDuration === 'function') {
			const currentStateDuration = agent && agent.getStateDuration();
			this.dispatch(onDurationChange('agent', toHMS(currentStateDuration)));
		}
		let networkStrength = networkStrengthMonitor.getNetworkStrength();
		this.dispatch(onChangeNetworkStrength(networkStrength));
	}

	dispose() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = undefined;
		}
	}

	register(dispatch) {
		this.intervalId && this.dispose();
		this.dispatch = dispatch;
		this.intervalId = setInterval(() => {
			this.mayBeUpdate();
		}, timeInMs);
	}
}

const intervalMonitor = new IntervalMonitor();
export default intervalMonitor;
