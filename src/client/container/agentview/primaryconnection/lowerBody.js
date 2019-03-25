import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import QuickFeedback from './quickFeedback';

import holdIcon from '../../../res/images/fa-hold.svg';
import resumeIcon from '../../../res/images/fa-resume.svg';
import muteIcon from '../../../res/images/fa-mute.svg';
import unMuteIcon from '../../../res/images/fa-mic.svg';
import dialNumberIcon from '../../../res/images/fa-dial-number.svg';
import quickConnect from '../../../res/images/fa-quick-connect.svg';
import transferIcon from '../../../res/images/fa-transfer.svg';
import {onRequestShowDialPad, onRequestShowQuickConnects, onRequestShowTransferCall} from "../../../reducers/acReducer";
import sessionManager from './../../../api/sessionManager';

import lo from 'lodash';
import styles from './agentview.css';

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

	_showHoldOrMute(currentState = undefined) {
		const state = lo.get(currentState, 'primaryConnectionState.state', 'none');
		return ['Connected', 'Joined', 'On hold', 'Hold'].includes(state);
	}

	_transferCall(currentState = undefined) {
		const state = lo.get(currentState, 'primaryConnectionState.state', 'none');
		return ['Connected', 'Joined', 'On hold', 'Hold'].includes(state);
	}

	_dialOrQuickConnectOrTransfer(currentState = undefined) {
		const state = lo.get(currentState, 'primaryConnectionState.state', 'none');
		return ['Inbound call', 'Outbound call'].includes(state) === false;
	}

	_isAfterCallWork(currentState = undefined) {
		const state = lo.get(currentState, 'primaryConnectionState.state', 'none');
		return ['AfterCallWork'].includes(state);
	}

	_isHold(currentState = undefined) {
		const state = lo.get(currentState, 'primaryConnectionState.state', 'none');
		return ['On hold', 'Hold'].includes(state);
	}

	toggleHold(currentState = undefined) {
		let isOnHold = this._isHold(currentState);
		let connection = lo.get(currentState, "primaryConnectionState.connection", undefined);
		let promise = isOnHold ? sessionManager.resumeConnection(connection) :
			sessionManager.holdConnection(connection);
		promise.then(() => _, err => console.error(err))
	}

	toggleMuteUnmute() {
		this.props.muted ? sessionManager.unmute() : sessionManager.mute();
	}

	requestDialPad() {
		this.props.requestDialPad();
	}

	requestTransferCall() {
		this.props.requestTransferCall();
	}

	requestQuickConnect() {
		this.props.requestQuickConnect();
	}

	render() {
		const {currentState, muted} = this.props;
		return (
			<div className="row">
				<div className="col-md-12">
					{
						this._showHoldOrMute(currentState) &&
						<div className="row mt-3">
							<div className="col-md-6">
								<a className={`btn ${styles.toggleHold}`}
								   onClick={() => this.toggleHold(currentState)}>
									<img
										src={this._isHold(currentState) ? resumeIcon : holdIcon}/> &nbsp; {this._isHold(currentState) ? 'Resume' : 'Hold'}
								</a>
							</div>

							<div className="col-md-6">
								<a onClick={this.toggleMuteUnmute}
								   className={`btn pl-0 pr-0 ${styles.toggleMute}`}
								> {muted ? <img src={unMuteIcon}/> : <img src={muteIcon}/>}
									{muted ? ' Unmute' : ' Mute'}
								</a>
							</div>
						</div>
					}
					{
						this._dialOrQuickConnectOrTransfer(currentState) &&
						<div className="row mt-3">
							<div className="col-md-6">
								<a className={`btn ${styles.quickConnectOrTransfer}`}
								   onClick={() => this.requestDialPad()}>
									<img src={dialNumberIcon}/> &nbsp;Dial number </a>
							</div>

							<div className="col-md-6">
								{
									this._transferCall(currentState) ?
										<a className={`btn pl-0 pr-0 ${styles.quickConnectOrTransfer}`}
										   onClick={() => this.requestTransferCall()}>
											<img src={transferIcon}/> &nbsp;Transfer </a> :
										<a className={`btn pl-0 pr-0 ${styles.quickConnectOrTransfer}`}
										   onClick={() => this.requestQuickConnect()}>
											<img src={quickConnect}/> &nbsp;Quick connects </a>

								}
							</div>

						</div>
					}
					{
						this._isAfterCallWork(currentState) && <QuickFeedback/>
					}

				</div>
			</div>
		);
	}
}

LowerBody.propTypes = {
	currentState: PropTypes.object,


	muted: PropTypes.bool.isRequired,
	requestDialPad: PropTypes.func.isRequired,
	requestQuickConnect: PropTypes.func.isRequired,
	requestTransferCall: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	currentState: state.acReducer.currentState,

	muted: state.acReducer.muted || false,
});
const mapDispatchToProps = dispatch => ({
	requestDialPad: () => {
		dispatch(onRequestShowDialPad('pending'));
	},
	requestQuickConnect: () => {
		dispatch(onRequestShowQuickConnects('pending'));
	},
	requestTransferCall: () => {
		dispatch(onRequestShowTransferCall('pending'));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LowerBody);
