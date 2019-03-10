import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import agentStateManager from './../../api/agentStateManager';
import acManager from './../../api/acManager';
import AcceptOrReject from "../footer/components/acceptOrReject";
import AvailableOrEnd from "../footer/components/availableOrEnd";

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
			color: '#ffffff'
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
			color: '#ffffff'
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
			fontSize: '14px'
		}
	},
	end: {
		divClass: 'col-md-6',
		linkClass: 'btn w-100',
		style: {
			height: '36px',
			boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
			backgroundColor: '#c91922',
			color: '#ffffff',
			fontFamily: 'AmazonEmber',
			fontSize: '14px'
		},
	},
};

const requestAgentStateChange = () => {
	let currentState = agentStateManager.getStateAsObject('Available');
	currentState && agentStateManager.setAgentState(currentState);
};

const _showAvailable = (agentState = null) => {
	return agentState && agentState.toLowerCase() !== 'available' &&
		!_showEndCall(agentState) &&
		!_acceptRejectCall(agentState);
};

const _showEndCall = (agentState = null) => {
	return ['Connected', 'Outbound Call', 'On hold'].includes(agentState);
};

const _acceptRejectCall = (agentState = null) => {
	return ['Inbound Call'].includes(agentState)
};

const Footer = ({agentState = 'unknown'}) => (
	<div className="card-footer" style={{backgroundColor: 'inherit', borderTop: 0}}>
		{
			_showAvailable(agentState) &&
			<AvailableOrEnd
				divClass={AgentViewStyle.available.divClass}
				linkClass={AgentViewStyle.available.linkClass}
				style={AgentViewStyle.available.style}
				text={'Set to Available'}
				onClickHandler={requestAgentStateChange}/>
		}
		{
			_showEndCall(agentState) &&
			<AvailableOrEnd divClass={AgentViewStyle.available.divClass}
							linkClass={AgentViewStyle.available.linkClass}
							style={AgentViewStyle.available.style}
							text={'End call'}
							isEnded={true}
							onClickHandler={acManager.hangupCall}/>

		}
		{
			_acceptRejectCall(agentState) &&
			<div className="row">
				<AcceptOrReject
					divClass={AgentViewStyle.accept.divClass}
					linkClass={AgentViewStyle.accept.linkClass}
					style={AgentViewStyle.accept.style}
					text={'Accept call'}
					onClickHandler={acManager.acceptCall}/>
				<AcceptOrReject divClass={AgentViewStyle.reject.divClass}
								linkClass={AgentViewStyle.reject.linkClass}
								style={AgentViewStyle.reject.style}
								text={'Reject call'}
								onClickHandler={acManager.hangupCall}/>
			</div>
		}
	</div>
);

Footer.propTypes = {
	agentState: PropTypes.string,
};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);
