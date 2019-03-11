import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';
import QuickFeedback from './quickFeedback';

import holdIcon from '../../res/images/fa-hold.svg';
import resumeIcon from '../../res/images/fa-resume.svg';
import muteIcon from '../../res/images/fa-mute.svg';
import unMuteIcon from '../../res/images/fa-mic.svg';
import dialNumberIcon from '../../res/images/fa-dial-number.svg';
import quickConnect from '../../res/images/fa-quick-connect.svg';
import transferIcon from '../../res/images/fa-transfer.svg';
import {onRequestShowDialPad} from "../../reducers/acReducer";
import connectionHandler from "../../api/connectionHandler";
import agentHandler from "../../api/agentHandler";


/*
	Card lower body. Mainly the lower part of the card body.
	It shows
	1. hold
	2. mute
	3. dial number
	4. quick connect
*/

class LowerBody extends Component {
	constructor(props) {
		super(props);

		this.toggleHold = this.toggleHold.bind(this);
		this.toggleMuteUnmute = this.toggleMuteUnmute.bind(this);
	}

	_showHoldOrMute(agentState = null) {
		return ['Connected', 'On hold'].includes(agentState);
	}

	_transferCall(agentState = null) {
		return ['Connected', 'On hold'].includes(agentState);
	}

	_dialOrQuickConnectOrTransfer(agentState = null) {
		return ['Inbound Call', 'Outbound Call'].includes(agentState) === false;
	}

	_isAfterCallWork(agentState = null) {
		return ['AfterCallWork'].includes(agentState);
	}

	toggleHold() {
		let isOnHold = connectionHandler.isOnHold();
		let promise = isOnHold ? connectionHandler.resume() : connectionHandler.hold();
		promise.then(success => {

		}).catch(err => {
			console.error(err);
		})
	}

	toggleMuteUnmute() {
		this.props.muted ? agentHandler.unmute() : agentHandler.mute();
	}

	requestDialPad() {
		this.props.requestDialPad();
	}

	render() {
		const agentState = this.props.agentState;

		//todo should come from API
		const muted = this.props.muted;

		return (
			<div className="row">
				<div className="col-md-12">
					{
						this._showHoldOrMute(agentState) &&
						<div className="row mt-3">
							<div className="col-md-6">
								<a className="btn" style={{
									width: '132px',
									height: '36px',
									boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
									backgroundColor: '#ffffff',
									color: '#000000',
									fontFamily: 'AmazonEmber',
									fontSize: '14px'
								}} href="#" onClick={this.toggleHold}>
									<img
										src={this.props.agentState === 'On hold' ? resumeIcon : holdIcon}/> &nbsp; {this.props.agentState === 'On hold' ? 'Resume' : 'Hold'}
								</a>
							</div>

							<div className="col-md-6">
								<a onClick={this.toggleMuteUnmute}
								   className="btn pl-0 pr-0" href="#" style={{
									width: '132px',
									height: '36px',
									boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
									backgroundColor: '#ffffff',
									color: '#000000',
									fontFamily: 'AmazonEmber',
									fontSize: '14px'
								}}> {muted ? <img src={unMuteIcon}/> : <img src={muteIcon}/>}
									{muted ? ' Unmute' : ' Mute'}
								</a>
							</div>
						</div>
					}
					{
						this._dialOrQuickConnectOrTransfer(agentState) &&
						<div className="row mt-3">
							<div className="col-md-6"><a className="btn" style={{
								width: '132px',
								height: '36px',
								boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
								backgroundColor: '#ffffff',
								color: '#000000',
								fontFamily: 'AmazonEmber',
								fontSize: '14px'
							}} href="#" onClick={() => this.requestDialPad()}>
								<img src={dialNumberIcon}/> &nbsp;Dial number </a>
							</div>

							<div className="col-md-6">
								{
									this._transferCall(agentState) ?
										<a className="btn pl-0 pr-0 disabled" href="#" style={{
											width: '132px',
											height: '36px',
											boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
											backgroundColor: '#ffffff',
											color: '#000000',
											fontFamily: 'AmazonEmber',
											fontSize: '14px'
										}}>
											<img src={transferIcon}/> &nbsp;Transfer </a> :
										<a className="btn pl-0 pr-0 disabled" href="#" style={{
											width: '132px',
											height: '36px',
											boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
											backgroundColor: '#ffffff',
											color: '#000000',
											fontFamily: 'AmazonEmber',
											fontSize: '14px'
										}}>
											<img src={quickConnect}/> &nbsp;Quick connect </a>

								}
							</div>

						</div>
					}
					{
						this._isAfterCallWork(agentState) && <QuickFeedback/>
					}

				</div>
			</div>
		);
	}
}

LowerBody.propTypes = {
	agentState: PropTypes.string.isRequired,
	muted: PropTypes.bool.isRequired,
	requestDialPad: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState || 'unknown',
	muted: state.acReducer.muted || false,
});
const mapDispatchToProps = dispatch => ({
	requestDialPad: () => {
		dispatch(onRequestShowDialPad('pending'));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LowerBody);
