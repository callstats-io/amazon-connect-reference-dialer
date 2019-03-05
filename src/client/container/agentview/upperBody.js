import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';

import agentMicMutedIcon from '../../res/images/muted-icon.svg';
import AudioLevel from './../audiolabelview/index';


/*
	Card upper body. Mainly the upper part of the card body.
	It shows
	1. the status, available, offline , muted or something else etc.
	2. the audio volume icon
	3. who I am connected with, and their audio volume
	4. time elapsed in current state
	5.

*/

class UpperBody extends Component {
	constructor(props) {
		super(props);
	}

	_showPhoneNumber(agentState = null) {
		return ['Connected', 'Inbound Call', 'Outbound Call', 'On hold'].includes(agentState);
	}

	_isConnected(agentState = null) {
		return ['Connected', 'On hold'].includes(agentState);
	}

	render() {
		const agentState = this.props.agentState;
		const duration = this.props.duration;
		const phoneNumber = this.props.phoneNumber;

		//todo should come from API
		const muted = this.props.muted;
		const agentAudioLevel = this.props.agentAudioLevel;
		const peerAudioLevel = this.props.peerAudioLevel;

		return (
			<div className={`row`}
				 style={{height: '182px', backgroundColor: '#3885de', paddingTop: '5%'}}>
				<div className={`col-md-9`}>
					<p className={`m-0`} style={{
						fontFamily: 'AmazonEmber',
						color: '#ffffff',
						fontSize: '24px'
					}}> {agentState} </p>
				</div>
				<div className={`col-md-3 text-center ${muted || agentAudioLevel <= 0 ? 'pt-1' : ''} `}
					 style={{height: '33px'}}>
					<AudioLevel audioLevel={agentAudioLevel} muted={muted}/>
				</div>

				<div className={`col-md-12`}>
					<div className={`row`}>
						<div className={`col-md-2`}>
							{muted && <SVG src={agentMicMutedIcon}/>}
						</div>
						<div className={`col-md-6 pl-0`}>
							{muted &&
							<p style={{
								fontFamily: 'AmazonEmber',
								color: '#ffffff',
								fontSize: '14px',
								marginTop: '2%'
							}}> MUTED</p>}
						</div>
						<div className={`col-md-4 text-center`}>
							<p style={{
								fontFamily: 'AmazonEmber',
								color: '#ffffff',
								marginLeft: '30%',
								fontSize: '14px',
								marginTop: '2%'
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
							}}> {this._isConnected(agentState) ? 'With' : 'To'} </p>}
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
						<div className={`col-md-2 pl-0`} style={{width: '20px', height: '20px', marginBottom: muted ? '3%' : '1%'}}>
							{this._showPhoneNumber(agentState) && <AudioLevel audioLevel={peerAudioLevel} muted={false}/>}
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

UpperBody.propTypes = {
	agentState: PropTypes.string.isRequired,
	duration: PropTypes.string.isRequired,
	phoneNumber: PropTypes.string.isRequired,
	muted: PropTypes.bool.isRequired,

	agentAudioLevel: PropTypes.number.isRequired,
	peerAudioLevel: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState || 'unknown',
	duration: state.acReducer.duration || '00:00:00',
	phoneNumber: state.acReducer.phoneNumber || '+358 449860466',
	muted: state.acReducer.muted || false,

	agentAudioLevel: state.acReducer.agentAudioLevel || 0,
	peerAudioLevel: state.acReducer.peerAudioLevel || 0,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpperBody);
