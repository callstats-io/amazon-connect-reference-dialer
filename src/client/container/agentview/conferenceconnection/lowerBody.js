import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import lo from 'lodash';


import sessionManager from "../../../api/sessionManager";

import BothHoldView from './components/bothhold';
import BothJoined from "./components/bothjoined";
import {onRequestShowDialPad} from "../../../reducers/acReducer";

// two participant in the conference are both in hold state
const isBothHold = (currentState = undefined) => {
	if (!currentState) {
		return false;
	}
	const primaryConnectionState = lo.get(currentState, 'primaryConnectionState.state', 'none');
	const thirdPartyConnectionState = lo.get(currentState, 'thirdPartyConnectionState.state', 'none');
	return primaryConnectionState === thirdPartyConnectionState && ['Hold', 'hold'].includes(primaryConnectionState);
};

// both are joined state
const isBothJoined = (currentState = undefined) => {
	if (!currentState) {
		return false;
	}
	const primaryConnectionState = lo.get(currentState, 'primaryConnectionState.state', 'none');
	const thirdPartyConnectionState = lo.get(currentState, 'thirdPartyConnectionState.state', 'none');
	return primaryConnectionState === thirdPartyConnectionState && ['Join', 'Joined', 'Connected'].includes(primaryConnectionState);
};

class LowerBody extends Component {
	constructor(props) {
		super(props);
		this.toggleMuteUnmute = this.toggleMuteUnmute.bind(this);
		this.resumeAll = this.resumeAll.bind(this);
		this.holdAll = this.holdAll.bind(this);
		this.dialNumber = this.dialNumber.bind(this);
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
