import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import StateChangeView from './statechangeview/index'
import AgentView from './agentview/index'
import SettingPageView from './settingsview/index'


class Home extends Component {
	constructor(props) {
		super(props);
	}

	showAgentView(agentStateChange, agentSetting) {
		return [agentStateChange, agentSetting].includes('pending') === false;
	}

	showStateChangeView(agentStateChange, agentSetting) {
		return agentStateChange === 'pending' && [agentSetting].includes('pending') === false;
	}

	showSettingPageView(agentStateChange, agentSetting) {
		return agentSetting === 'pending' && [agentStateChange].includes('pending') === false;
	}

	render() {
		const initialized = this.props.initialized;
		const requestAgentStateChange = this.props.requestAgentStateChange;
		const requestAgentSettingsChange = this.props.requestAgentSettingsChange;
		return (
			initialized &&
			<div className={`container`} style={{width: '320px', height: '480px'}}>
				{
					this.showAgentView(requestAgentStateChange, requestAgentSettingsChange) &&
					<AgentView/>}
				{
					this.showStateChangeView(requestAgentStateChange, requestAgentSettingsChange) &&
					<StateChangeView/>}
				{
					this.showSettingPageView(requestAgentStateChange, requestAgentSettingsChange) &&
					<SettingPageView/>}
			</div>
		);
	}
}

Home.propTypes = {
	initialized: PropTypes.bool.isRequired,
	requestAgentStateChange: PropTypes.string.isRequired,
	requestAgentSettingsChange: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
	requestAgentStateChange: state.acReducer.requestAgentStateChange || 'completed',
	requestAgentSettingsChange: state.acReducer.requestAgentSettingsChange || 'completed',
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
