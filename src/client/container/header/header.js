import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {
	onRequestAgentSettingsChange,
	onRequestAgentStateChange
} from '../../reducers/acReducer'

import Custom from './custom';
import Empty from './empty';

const Header = ({requestAgentStateChange, requestAgentSettingsChange, emptyBody = false}) => (
	emptyBody ? <Empty/> : <Custom
		requestAgentStateChange={requestAgentStateChange}
		requestAgentSettingsChange={requestAgentSettingsChange}/>
);

Header.propTypes = {
	emptyBody: PropTypes.bool,
	requestAgentStateChange: PropTypes.func.isRequired,
	requestAgentSettingsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
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
