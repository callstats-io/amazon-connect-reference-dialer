import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';

import {getStateColor} from '../utils/acutils'
import voiceFreqIcon from './../res/images/agent-voice-freq-icon.svg';
import agentMicMutedIcon from './../res/images/muted-icon.svg';


/*
	Basic card body. Mainly the middle part of the whole card.
	It shows
	1. the status, available, offline , muted or something else etc.
	2. the audio volume icon
	3. who I am connected with, and their audio volume
	4. time elapsed in current state
	5.

*/

class CardBasic extends Component {
	constructor(props) {
		super(props);
	}

	showPhoneNumber(agentState = null) {
		return ['Connected', 'Inbound Call', 'Outbound Call'].includes(agentState);
	}

	render() {
		const agentState = this.props.agentState;
		const duration = this.props.duration;
		const phoneNumber = this.props.phoneNumber;

		//todo should come from API
		const muted = this.props.muted;

		return (
			<div className={`card-body`}
				 style={{paddingLeft: '0.95em', paddingRight: '0.95em', paddingTop: '0'}}>
				<div className={`row`}
					 style={{height: '182px', backgroundColor:'#3885de', paddingTop: '5%'}}>
					<div className={`col-md-8`}>
						<p className={`m-0`} style={{
							fontFamily: 'AmazonEmber',
							color: '#ffffff',
							fontSize: '24px'
						}}> {agentState} </p>
					</div>
					<div className={`col-md-4 text-center`}>
						<SVG style={{marginLeft: '30%'}}
							 src={voiceFreqIcon}/>
					</div>

					<div className={`col-md-12`}>
						<div className={`row`}>
							<div className={`col-md-2`}>
								{muted && <SVG src={agentMicMutedIcon}/>}
							</div>
							<div className={`col-md-6 pl-0`}>
								{muted &&
								<p style={{fontFamily: 'AmazonEmber', color: '#ffffff', fontSize: '14px'}}> MUTED</p>}
							</div>
							<div className={`col-md-4 text-center`}>
								<p style={{
									fontFamily: 'AmazonEmber',
									color: '#ffffff',
									marginLeft: '30%',
									fontSize: '14px'
								}}> You</p>
							</div>
						</div>
					</div>

					<div className={`col-md-12`}>
						<div className={`row`}>
							<div className={`col-md-6`}>
								{this.showPhoneNumber(agentState) &&
								<p className={`m-0`} style={{
									fontFamily: 'AmazonEmber',
									color: '#ffffff',
									fontSize: '14px'
								}}> {agentState === 'Connected' ? 'With' : 'To'} </p>}
							</div>
							<div className={`col-md-6 text-right`}>
								<p className={`m-0`}
								   style={{fontFamily: 'AmazonEmber', color: '#ffffff', fontSize: '14px'}}> Time
									elapsed</p>
							</div>
							<div className={`col-md-6 align-self-center`}>
								{this.showPhoneNumber(agentState) &&
								<p className={`m-0`}
								   style={{
									   fontFamily: 'AmazonEmber',
									   color: '#ffffff',
									   fontSize: '14px'
								   }}>{phoneNumber}</p>}
							</div>
							<div className={`col-md-2 pl-0`}>
								{this.showPhoneNumber(agentState) && <SVG src={voiceFreqIcon} width="30"/>}
							</div>
							<div className={`col-md-4 align-self-center text-right`}>
								<p className={`m-0`}
								   style={{
									   fontFamily: 'AmazonEmber',
									   color: '#ffffff',
									   fontSize: '14px'
								   }}>{duration}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CardBasic.propTypes = {
	agentState: PropTypes.string.isRequired,
	duration: PropTypes.string.isRequired,
	phoneNumber: PropTypes.string.isRequired,
	muted: PropTypes.bool.isRequired,
};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState || 'unknown',
	duration: state.acReducer.duration || '00:00:00',
	phoneNumber: state.acReducer.phoneNumber || '',
	muted: state.acReducer.muted || false,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CardBasic);
