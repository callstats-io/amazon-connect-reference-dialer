import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import StateChangeView from './statechangeview/index'
import AgentView from './agentview/index'
import SettingPageView from './settingsview/index'
import ReportCallIssueView from './reportissueview/index'
import ConnectivityCheckView from './connectivitycheckview/index'


class Home extends Component {
	constructor(props) {
		super(props);
	}

	showAgentView(agentStateChange, agentSetting, repotCallIssue, connectivityCheck) {
		return [agentStateChange, agentSetting, repotCallIssue, connectivityCheck].includes('pending') === false;
	}

	showStateChangeView(agentStateChange, agentSetting, reportCallIssue, connectivityCheck) {
		return agentStateChange === 'pending' && [agentSetting, reportCallIssue, connectivityCheck].includes('pending') === false;
	}

	showSettingPageView(agentStateChange, agentSetting, reportCallIssue, connectivityCheck) {
		return agentSetting === 'pending' && [agentStateChange, reportCallIssue, connectivityCheck].includes('pending') === false;
	}

	showReportCallIssueView(agentStateChange, agentSetting, reportCallIssue, connectivityCheck) {
		return reportCallIssue === 'pending' && [agentStateChange, agentSetting, connectivityCheck].includes('pending') === false;
	}

	showConnectivityCheckView(agentStateChange, agentSetting, reportCallIssue, connectivityCheck) {
		return connectivityCheck === 'pending' && [agentStateChange, agentSetting, reportCallIssue].includes('pending') === false;
	}


	render() {
		const initialized = this.props.initialized;
		const requestAgentStateChange = this.props.requestAgentStateChange;
		const requestAgentSettingsChange = this.props.requestAgentSettingsChange;
		const requestReportCallIssue = this.props.requestReportCallIssue;
		const requestConnectivityCheck = this.props.requestConnectivityCheck;

		return (
			initialized &&
			<div className={`container`} style={{width: '320px', height: '480px'}}>
				{
					this.showAgentView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck) &&
					<AgentView/>}
				{
					this.showStateChangeView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck) &&
					<StateChangeView/>}
				{
					this.showSettingPageView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck) &&
					<SettingPageView/>}

				{
					this.showReportCallIssueView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck) &&
					<ReportCallIssueView/>}

				{
					this.showConnectivityCheckView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck) &&
					<ConnectivityCheckView/>}

			</div>
		);
	}
}

Home.propTypes = {
	initialized: PropTypes.bool.isRequired,
	requestAgentStateChange: PropTypes.string.isRequired,
	requestAgentSettingsChange: PropTypes.string.isRequired,
	requestReportCallIssue: PropTypes.string.isRequired,
	requestConnectivityCheck: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
	requestAgentStateChange: state.acReducer.requestAgentStateChange || 'complete',
	requestAgentSettingsChange: state.acReducer.requestAgentSettingsChange || 'complete',
	requestReportCallIssue: state.acReducer.requestReportCallIssue || 'complete',
	requestConnectivityCheck: state.acReducer.requestConnectivityCheck || 'complete',
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
