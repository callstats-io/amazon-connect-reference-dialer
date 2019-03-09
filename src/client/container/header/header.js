import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {
	onRequestAgentSettingsChange,
	onRequestAgentStateChange
} from '../../reducers/acReducer'

import Custom from './custom';
import Empty from './empty';

const Header = ({agentState = 'unknown', requestAgentStateChange, requestAgentSettingsChange, emptyBody = false}) => (
	emptyBody ? <Empty/> : <Custom
		requestAgentStateChange={requestAgentStateChange}
		requestAgentSettingsChange={requestAgentSettingsChange}/>
);

Header.propTypes = {
	emptyBody: PropTypes.bool,
	agentState: PropTypes.string,
	requestAgentStateChange: PropTypes.func.isRequired,
	requestAgentSettingsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	agentState: state.acReducer.agentState,
});

const mapDispatchToProps = dispatch => ({
	requestAgentStateChange: () => {
		dispatch(onRequestAgentStateChange('pending'));
	},
	requestAgentSettingsChange: () => {
		dispatch(onRequestAgentSettingsChange('pending'));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);
