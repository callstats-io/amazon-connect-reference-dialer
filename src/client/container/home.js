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
import TransferCallView from './transfercall/index'
import Login from './login/index';

const maybeShowThisView = (currentView, ...others) => {
	// current view needs to be pending
	let isPending = ['pending'].includes(currentView);
	if (!isPending) {
		return false;
	}
	isPending = others.some(viewItem => {
		return ['pending'].includes(viewItem);
	});
	// none of other view can be in pending state
	if (isPending) {
		return false;
	}
	return true;
};

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const initialized = this.props.initialized;
		const requestAgentStateChange = this.props.requestAgentStateChange;
		const requestAgentSettingsChange = this.props.requestAgentSettingsChange;
		const requestReportCallIssue = this.props.requestReportCallIssue;
		const requestConnectivityCheck = this.props.requestConnectivityCheck;
		const requestShowDialPad = this.props.requestShowDialPad;
		const requestShowQuickConnects = this.props.requestShowQuickConnects;
		const requestShowTransferCall = this.props.requestShowTransferCall;

		return (
			!initialized ?
				<div className={`container`} style={{width: '320px', height: '480px'}}>
					<Login/>
				</div> :
				<div className={`container`} style={{width: '320px', height: '480px'}}>
					{
						maybeShowThisView('pending', requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue,
							requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects,
							requestShowTransferCall) &&
						<AgentView/>}
					{
						maybeShowThisView(requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue,
							requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects,
							requestShowTransferCall) &&
						<StateChangeView/>}
					{
						maybeShowThisView(requestAgentSettingsChange, requestAgentStateChange, requestReportCallIssue,
							requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects, requestShowTransferCall) &&
						<SettingPageView/>}

					{
						maybeShowThisView(requestReportCallIssue, requestAgentStateChange, requestAgentSettingsChange,
							requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects, requestShowTransferCall) &&
						<ReportCallIssueView/>}

					{
						maybeShowThisView(requestConnectivityCheck, requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue,
							requestShowDialPad, requestShowQuickConnects, requestShowTransferCall) &&
						<ConnectivityCheckView/>}

					{
						maybeShowThisView(requestShowDialPad, requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue,
							requestConnectivityCheck, requestShowQuickConnects, requestShowTransferCall) &&
						<DialPadView/>}

					{
						maybeShowThisView(requestShowQuickConnects, requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue,
							requestConnectivityCheck, requestShowDialPad, requestShowTransferCall) &&
						<QuickConnectsView/>}

					{
						maybeShowThisView(requestShowTransferCall, requestAgentStateChange, requestAgentSettingsChange, requestReportCallIssue,
							requestConnectivityCheck, requestShowDialPad, requestShowQuickConnects) &&
						<TransferCallView/>}
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
	requestShowTransferCall: PropTypes.string.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
	requestAgentStateChange: state.acReducer.requestAgentStateChange || 'complete',
	requestAgentSettingsChange: state.acReducer.requestAgentSettingsChange || 'complete',
	requestReportCallIssue: state.acReducer.requestReportCallIssue || 'complete',
	requestConnectivityCheck: state.acReducer.requestConnectivityCheck || 'complete',
	requestShowDialPad: state.acReducer.requestShowDialPad || 'complete',
	requestShowQuickConnects: state.acReducer.requestShowQuickConnects || 'complete',
	requestShowTransferCall: state.acReducer.requestShowTransferCall || 'complete',
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
