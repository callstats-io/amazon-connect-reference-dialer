import {onAgentStateChange, onCCPError} from "../reducers/acReducer";
import {
	getAgentState,
	getAgentStateForHoldUnhold,
	isAgentStateChange,
	isCallOnHoldUnhold,
	isError
} from "./agenetevents";
import contactHandler from "./contactHandler";

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
			connect.core.getEventBus().subscribe('<<all>>', e => {
				console.info("--------------->", 'all ', e);
				if (isAgentStateChange(e)) {
					const agentState = getAgentState(e);
					this.dispatch(onAgentStateChange(agentState));
				} else if (isCallOnHoldUnhold(e)) {
					const tempAgentState = getAgentStateForHoldUnhold(e, contactHandler.getContact());
					const agentState = getAgentState(tempAgentState);
					this.dispatch(onAgentStateChange(agentState));
				} else if (isError(e)) {
					this.dispatch(onCCPError({...e}));
				}
			});
		}
	}
}

const eventHandler = new EventHandler();
export default eventHandler;
