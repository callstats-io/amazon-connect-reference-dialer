import React, {Component} from "react";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';


import activeIcon from '../../res/images/fa-tick-mark.svg'
import PropTypes from "prop-types";
import {
	onAgentStateChange,
	onRequestAgentStateChange
} from "../../reducers/acReducer";

import agentStateManager  from './../../api/agentStateManager';
import acManager  from './../../api/acManager';

class Body extends Component {
	constructor(props) {
		super(props);
		this.agentStates = agentStateManager.getAgentStates();
	}

	requestAgentStateChange(currentState=undefined) {
		//todo change agent state by calling acManager.js
		acManager.setAgentState(currentState);
		this.props.requestAgentStateChange();
	}

	render() {
		const agentState = this.props.agentState;

		return (
			<div className="card-body" style={{}}>
				{this.agentStates.map((currentState, _) => (
					<div key={`agent-state-${currentState.name}`} className="row" style={{cursor: 'pointer'}}
						 onClick={() => this.requestAgentStateChange(currentState)}>
						<div className="col-md-2">
							{currentState.name === agentState && <SVG src={activeIcon}/>}
						</div>
						<div className="col-md-10">
							<p style={{color: '#3885de', fontFamily: 'AmazonEmber'}}> {currentState.name}</p>
						</div>
					</div>
				))}
			</div>
		);
	}
}

Body.propTypes = {
	agentState: PropTypes.string.isRequired,
	requestAgentStateChange: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState || 'unknown',
});
const mapDispatchToProps = dispatch => ({
	requestAgentStateChange: () => {
		dispatch(onRequestAgentStateChange('complete'));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Body);

