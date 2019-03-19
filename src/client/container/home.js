import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import StateChangeView from './statechangeview/index'
import AgentView from './agentview/index'
import SettingPageView from './settingsview/index'
import ReportCallIssueView from './reportissueview/index'
import ConnectivityCheckView from './connectivitycheckview/index'
import DialPadView from './dialerview/index'
import QuickConnectsView from './quickconnects/index'


class Home extends Component {
	constructor(props) {
		super(props);
	}

	showAgentView(agentStateChange, agentSetting, repotCallIssue, connectivityCheck, requestShowDialPad, requestShowQuickConnects) {
		return [agentStateChange, agentSetting, repotCallIssue, connectivityCheck, requestShowDialPad, requestShowQuickConnects].includes('pending') === false;
	}

	showStateChangeView(agentStateChange, agentSetting, reportCallIssue, connectivityCheck, requestShowDialPad, requestShowQuickConnects) {
		return agentStateChange === 'pending' && [agentSetting, reportCallIssue, connectivityCheck, requestShowDialPad, requestShowQuickConnects].includes('pending') === false;
	}

	showSettingPageView(agentStateChange, agentSetting, reportCallIssue, connectivityCheck, requestShowDialPad, requestShowQuickConnects) {
		return agentSetting === 'pending' && [agentStateChange, reportCallIssue, connectivityCheck, requestShowDialPad, requestShowQuickConnects].includes('pending') === false;
	}

	showReportCallIssueView(agentStateChange, agentSetting, reportCallIssue, connectivityCheck, requestShowDialPad, requestShowQuickConnects) {
		return reportCallIssue === 'pending' && [agentStateChange, agentSetting, connectivityCheck, requestShowDialPad, requestShowQuickConnects].includes('pending') === false;
	}

	showConnectivityCheckView(agentStateChange, agentSetting, reportCallIssue, connectivityCheck, requestShowDialPad, requestShowQuickConnects) {
		return connectivityCheck === 'pending' && [agentStateChange, agentSetting, reportCallIssue, requestShowDialPad, requestShowQuickConnects].includes('pending') === false;
	}

	showDialPadView(agentStateChange, agentSetting, reportCallIssue, connectivityCheck, requestShowDialPad, requestShowQuickConnects) {
		return requestShowDialPad === 'pending' && [agentStateChange, agentSetting, reportCallIssue, connectivityCheck, requestShowQuickConnects].includes('pending') === false;
	}

	showQuickConnects(agentStateChange, agentSetting, reportCallIssue, connectivityCheck, requestShowDialPad, requestShowQuickConnects) {
		return requestShowQuickConnects === 'pending' && [agentStateChange, agentSetting, reportCallIssue, connectivityCheck, requestShowDialPad].includes('pending') === false;
	}


	render() {
		const initialized = this.props.initialized;
		const requestAgentStateChange = this.props.requestAgentStateChange;
		const requestAgentSettingsChange = this.props.requestAgentSettingsChange;
		const requestReportCallIssue = this.props.requestReportCallIssue;
		const requestConnectivityCheck = this.props.requestConnectivityCheck;
		const requestShowDialPad = this.props.requestShowDialPad;
		const requestShowQuickConnects = this.props.requestShowQuickConnects;

		return (
			initialized &&
			<div className={`container`} style={{width: '320px', height: '480px'}}>
				{
					this.showAgentView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects) &&
					<AgentView/>}
				{
					this.showStateChangeView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects) &&
					<StateChangeView/>}
				{
					this.showSettingPageView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects) &&
					<SettingPageView/>}

				{
					this.showReportCallIssueView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects) &&
					<ReportCallIssueView/>}

				{
					this.showConnectivityCheckView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects) &&
					<ConnectivityCheckView/>}

				{
					this.showDialPadView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects) &&
					<DialPadView/>}

				{
					this.showQuickConnects(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue, requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects) &&
					<QuickConnectsView/>}

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
	requestShowDialPad: PropTypes.string.isRequired,
	requestShowQuickConnects: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
	requestAgentStateChange: state.acReducer.requestAgentStateChange || 'complete',
	requestAgentSettingsChange: state.acReducer.requestAgentSettingsChange || 'complete',
	requestReportCallIssue: state.acReducer.requestReportCallIssue || 'complete',
	requestConnectivityCheck: state.acReducer.requestConnectivityCheck || 'complete',
	requestShowDialPad: state.acReducer.requestShowDialPad || 'complete',
	requestShowQuickConnects: state.acReducer.requestShowQuickConnects || 'complete',
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
