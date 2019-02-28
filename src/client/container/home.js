import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import StateChangeView from './statechangeview/index'
import AgentView from './agentview/index'
import SettingPageView from './settingsview/index'
import ReportCallIssueView from './reportissueview/index'


class Home extends Component {
	constructor(props) {
		super(props);
	}

	showAgentView(agentStateChange, agentSetting, repotCallIssue) {
		return [agentStateChange, agentSetting, repotCallIssue].includes('pending') === false;
	}

	showStateChangeView(agentStateChange, agentSetting, reportCallIssue) {
		return agentStateChange === 'pending' && [agentSetting, reportCallIssue].includes('pending') === false;
	}

	showSettingPageView(agentStateChange, agentSetting, reportCallIssue) {
		return agentSetting === 'pending' && [agentStateChange, reportCallIssue].includes('pending') === false;
	}

	showReportCallIssueView(agentStateChange, agentSetting, reportCallIssue) {
		return reportCallIssue === 'pending' && [agentStateChange, agentSetting].includes('pending') === false;
	}

	render() {
		const initialized = this.props.initialized;
		const requestAgentStateChange = this.props.requestAgentStateChange;
		const requestAgentSettingsChange = this.props.requestAgentSettingsChange;
		const requestReportCallIssue = this.props.requestReportCallIssue;
		return (
			initialized &&
			<div className={`container`} style={{width: '320px', height: '480px'}}>
				{
					this.showAgentView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue) &&
					<AgentView/>}
				{
					this.showStateChangeView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue) &&
					<StateChangeView/>}
				{
					this.showSettingPageView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue) &&
					<SettingPageView/>}

				{
					this.showReportCallIssueView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue) &&
					<ReportCallIssueView/>}

			</div>
		);
	}
}

Home.propTypes = {
	initialized: PropTypes.bool.isRequired,
	requestAgentStateChange: PropTypes.string.isRequired,
	requestAgentSettingsChange: PropTypes.string.isRequired,
	requestReportCallIssue: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
	requestAgentStateChange: state.acReducer.requestAgentStateChange || 'complete',
	requestAgentSettingsChange: state.acReducer.requestAgentSettingsChange || 'complete',
	requestReportCallIssue: state.acReducer.requestReportCallIssue || 'complete',
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
