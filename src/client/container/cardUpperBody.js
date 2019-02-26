import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';

import voiceFreqIcon from './../res/images/agent-voice-freq-icon.svg';
import agentMicMutedIcon from './../res/images/muted-icon.svg';


/*
	Card upper body. Mainly the upper part of the card body.
	It shows
	1. the status, available, offline , muted or something else etc.
	2. the audio volume icon
	3. who I am connected with, and their audio volume
	4. time elapsed in current state
	5.

*/

class CardUpperBody extends Component {
	constructor(props) {
		super(props);
	}

	_showPhoneNumber(agentState = null) {
		return ['Connected', 'Inbound Call', 'Outbound Call'].includes(agentState);
	}

	render() {
		const agentState = this.props.agentState;
		const duration = this.props.duration;
		const phoneNumber = this.props.phoneNumber;

		//todo should come from API
		const muted = this.props.muted;

		return (
			<div className={`row`}
				 style={{height: '182px', backgroundColor: '#3885de', paddingTop: '5%'}}>
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
							{this._showPhoneNumber(agentState) &&
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
							{this._showPhoneNumber(agentState) &&
							<p className={`m-0`}
							   style={{
								   fontFamily: 'AmazonEmber',
								   color: '#ffffff',
								   fontSize: '14px'
							   }}>{phoneNumber}</p>}
						</div>
						<div className={`col-md-2 pl-0`}>
							{this._showPhoneNumber(agentState) && <SVG src={voiceFreqIcon} width="30"/>}
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
		);
	}
}

CardUpperBody.propTypes = {
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
)(CardUpperBody);
