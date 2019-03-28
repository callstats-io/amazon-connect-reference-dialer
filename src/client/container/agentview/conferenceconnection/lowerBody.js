import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import lo from 'lodash';


import sessionManager from "../../../api/sessionManager";

import BothHoldView from './components/bothhold';
import BothJoined from "./components/bothjoined";
import OneHoldOtherConnected from "./components/oneHoldOtherConnected";

import {onRequestShowDialPad} from "../../../reducers/acReducer";

const isHold = (state) => {
	return ['Hold', 'hold', 'On hold'].includes(state);
};
const isConnected = (state) => {
	return ['Join', 'Joined', 'Connected'].includes(state);
};
// two participant in the conference are both in hold state
const isBothHold = (currentState = undefined) => {
	if (!currentState) {
		return false;
	}
	const primaryConnectionState = lo.get(currentState, 'primaryConnectionState.state', 'none');
	const thirdPartyConnectionState = lo.get(currentState, 'thirdPartyConnectionState.state', 'none');
	return primaryConnectionState === thirdPartyConnectionState && isHold(primaryConnectionState);
};

// both are joined state
const isBothJoined = (currentState = undefined) => {
	if (!currentState) {
		return false;
	}
	const primaryConnectionState = lo.get(currentState, 'primaryConnectionState.state', 'none');
	const thirdPartyConnectionState = lo.get(currentState, 'thirdPartyConnectionState.state', 'none');
	return primaryConnectionState === thirdPartyConnectionState && isConnected(primaryConnectionState);
};

// one is connected, and another one is on hold
// or some other scenario where both have different connection state
const isOneHoldOtherConnected = (currentState = undefined) => {
	if (!currentState) {
		return false;
	}
	const primaryConnectionState = lo.get(currentState, 'primaryConnectionState.state', 'none');
	const thirdPartyConnectionState = lo.get(currentState, 'thirdPartyConnectionState.state', 'none');
	return primaryConnectionState !== thirdPartyConnectionState;
};

class LowerBody extends Component {
	constructor(props) {
		super(props);
		this.toggleMuteUnmute = this.toggleMuteUnmute.bind(this);
		this.resumeAll = this.resumeAll.bind(this);
		this.holdAll = this.holdAll.bind(this);
		this.dialNumber = this.dialNumber.bind(this);
		this.joinConnection = this.joinConnection.bind(this);
		this.swapConnection = this.swapConnection.bind(this);
	}

	toggleMuteUnmute() {
		this.props.muted ? sessionManager.unmute() : sessionManager.mute();
	}

	resumeAll() {
		sessionManager.resumeAll().then(s => {
		}, e => console.error(e));
	}

	holdAll() {
		sessionManager.holdAll().then(s => {
		}, e => console.error(e));
	}

	dialNumber() {
		this.props.requestDialPad();
	}

	joinConnection() {
		// join call, and resume all actually same.
		// so just calling the same function
		sessionManager.resumeAll().then(s => {
		}, e => console.error(e));
	}

	isAfterCallWork(currentState = undefined) {
		const primaryState = lo.get(currentState, 'primaryConnectionState.state', 'none');
		const thirdPartyState = lo.get(currentState, 'primaryConnectionState.state', 'none');
		return [primaryState, thirdPartyState].includes('AfterCallWork');
	}
	swapConnection() {
		sessionManager.swapCall().then(s => {
		}, e => console.error(e));
	}

	render() {
		const currentState = this.props.currentState;
		const muted = this.props.muted;
		return (
			<div className="row">
				<div className="col-md-12">
					{
						isBothHold(currentState) && <BothHoldView muted={muted}
																  toggleMuteUnmute={this.toggleMuteUnmute}
																  resumeAll={this.resumeAll}/>
					}
					{
						isBothJoined(currentState) && <BothJoined muted={muted}
																  dialNumber={this.dialNumber}
																  toggleMuteUnmute={this.toggleMuteUnmute}
																  holdAll={this.holdAll}/>
					}
					{
						isOneHoldOtherConnected(currentState) &&
						<OneHoldOtherConnected joinConnection={this.joinConnection}
											   swapConnection={this.swapConnection}
											   holdAll={this.holdAll}
											   dialNumber={this.dialNumber}
											   toggleMuteUnmute={this.toggleMuteUnmute}
											   muted={muted}/>
					}
					{
						this.isAfterCallWork(currentState) && <QuickFeedback/>
					}

				</div>
			</div>
		);
	}
}

LowerBody.propTypes = {
	currentState: PropTypes.object,
	muted: PropTypes.bool,
	requestDialPad: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	currentState: state.acReducer.currentState,
	muted: state.acReducer.muted || false,
});
const mapDispatchToProps = dispatch => ({
	requestDialPad: () => {
		dispatch(onRequestShowDialPad('pending'));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LowerBody);
