import React from "react";
import {connect} from "react-redux";

import activeIcon from '../../res/images/fa-tick-mark.svg'
import PropTypes from "prop-types";
import styles from './statuschange.css';

import {
	onRequestAgentStateChange
} from "../../reducers/acReducer";

import agentStateManager from './../../api/agentStateManager';

// get list of states using api
const getAgentStates = () => {
	let agentStates = agentStateManager.getAgentStates();
	return agentStates || [];
};

// change state using api
const changeAgentState = (currentState) => {
	agentStateManager.setAgentState(currentState);
};

const Body = ({agentState = 'unknown', requestAgentStateChange}) => (
	<div className="card-body" style={{}}>
		{getAgentStates().map((currentState) => (
			<div key={`agent-state-${currentState.name}`} className={`row ${styles.acPointer} ${styles.acList}`}
				 onClick={() => requestAgentStateChange(currentState)}>
				<div className="col-md-2">
					{currentState && currentState.name === agentState && <img src={activeIcon}/>}
				</div>
				<div className="col-md-10">
					<span className={`${styles.acSpan}`}> {currentState.name}</span>
				</div>
			</div>
		))}
	</div>
);

Body.propTypes = {
	agentState: PropTypes.string,
	requestAgentStateChange: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState || 'unknown',
});

const mapDispatchToProps = dispatch => ({
	requestAgentStateChange: (currentState) => {
		changeAgentState(currentState);
		dispatch(onRequestAgentStateChange('complete'));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Body);

