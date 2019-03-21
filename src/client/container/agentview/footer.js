import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import agentStateManager from '../../api/agentStateManager';
import AcceptOrReject from "../footer/components/acceptOrReject";
import AvailableOrEnd from "../footer/components/availableOrEnd";
import connectionHandler from "../../api/connectionHandler";
import contactHandler from "../../api/contactHandler";
import lo from "lodash";

const AgentViewStyle = {
	accept: {
		divClass: 'col-md-6',
		linkClass: 'btn',
		style: {
			height: '36px',
			boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
			backgroundColor: '#0e9526',
			fontFamily: 'AmazonEmber',
			textAlign: 'center',
			color: '#ffffff',
			borderRadius: '0px',
		},
	},
	reject: {
		divClass: 'col-md-6',
		linkClass: 'btn',
		style: {
			height: '36px',
			boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
			backgroundColor: '#c91922',
			fontFamily: 'AmazonEmber',
			textAlign: 'center',
			color: '#ffffff',
			borderRadius: '0px',
		},
	},
	available: {
		divClass: 'col-md-12',
		linkClass: 'btn w-100',
		style: {
			height: '36px',
			boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
			backgroundColor: '#3885de',
			color: '#ffffff',
			fontFamily: 'AmazonEmber',
			fontSize: '14px',
			borderRadius: '0px',
		}
	},
	end: {
		divClass: 'col-md-12',
		linkClass: 'btn w-100',
		style: {
			height: '36px',
			boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
			backgroundColor: '#c91922',
			color: '#ffffff',
			fontFamily: 'AmazonEmber',
			fontSize: '14px',
			borderRadius: '0px',
		},
	},
};

const getCurrentStateString = (currentState = undefined) => {
	const state = lo.get(currentState, 'primaryConnectionState.state', 'none');
	return state;
};

const requestAgentStateChange = () => {
	let currentState = agentStateManager.getStateAsObject('Available');
	currentState && agentStateManager.setAgentState(currentState);
};

const hangupCall = () => {
	connectionHandler.hangupCall();
};

const acceptCall = () => {
	contactHandler.acceptCall();
};

const _showAvailable = (currentState = undefined) => {
	const agentState = getCurrentStateString(currentState);
	return !_showEndCall(currentState) &&
		!_acceptRejectCall(currentState) &&
		agentState !== 'Available';
};

const _showEndCall = (currentState = undefined) => {
	const agentState = getCurrentStateString(currentState);
	return ['Connected', 'Joined', 'Outbound Call', 'Outbound call', 'On hold', 'Hold'].includes(agentState);
};

const _acceptRejectCall = (currentState = undefined) => {
	const agentState = getCurrentStateString(currentState);
	return ['Inbound Call', 'Inbound call'].includes(agentState)
};

const Footer = ({currentState = {}}) => (
	<div className="card-footer" style={{backgroundColor: 'inherit', borderTop: 0}}>
		{
			_showAvailable(currentState) &&
			<AvailableOrEnd
				divClass={AgentViewStyle.available.divClass}
				linkClass={AgentViewStyle.available.linkClass}
				style={AgentViewStyle.available.style}
				text={'Set to Available'}
				onClickHandler={requestAgentStateChange}/>
		}
		{
			_showEndCall(currentState) &&
			<AvailableOrEnd divClass={AgentViewStyle.end.divClass}
							linkClass={AgentViewStyle.end.linkClass}
							style={AgentViewStyle.end.style}
							text={' End call'}
							isEnded={true}
							onClickHandler={hangupCall}/>

		}
		{
			_acceptRejectCall(currentState) &&
			<div className="row">
				<AcceptOrReject
					divClass={AgentViewStyle.accept.divClass}
					linkClass={AgentViewStyle.accept.linkClass}
					style={AgentViewStyle.accept.style}
					text={'Accept call'}
					onClickHandler={acceptCall}/>

				<AcceptOrReject divClass={AgentViewStyle.reject.divClass}
								linkClass={AgentViewStyle.reject.linkClass}
								style={AgentViewStyle.reject.style}
								text={' Reject call'}
								isReject={true}
								onClickHandler={hangupCall}/>
			</div>
		}
	</div>
);

Footer.propTypes = {
	currentState: PropTypes.object,
};
const mapStateToProps = state => ({
	currentState: state.acReducer.currentState,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);
