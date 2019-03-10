import {onAudioLevelChange, onChangeNetworkStrength, onDurationChange} from "../reducers/acReducer";
import {toHMS} from "../utils/acutils";
import networkStrengthMonitor from "./networkStrengthMonitor";
import audioFrequencyMonitor from "./audioFrequencyMonitor";
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
		console.warn('->', networkStrength);
		this.dispatch(onChangeNetworkStrength(networkStrength));

		let audioIntputLevel = audioFrequencyMonitor.getAudioLevel(false);
		let audioOutputLevel = audioFrequencyMonitor.getAudioLevel(true);

		// console.warn('->', audioIntputLevel, audioOutputLevel);
		this.dispatch(onAudioLevelChange(audioIntputLevel, audioOutputLevel))
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
