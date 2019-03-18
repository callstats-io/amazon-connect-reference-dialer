import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import agentMediaManager from "../../api/agentMediaManager";

import AgentStatusAndAudioLabel from "./agentStatusAndAudioLabel";
import AgentMutedLabel from "./agentMutedLabel";
import PeerAndAgentDuration from "./peerAndAgentDuration";
import {getColorSchema} from './../../utils/agetStateMap';
import Error from './../errors/index';

import styles from './agentview.css';

/*
	Card upper body. Mainly the upper part of the card body.
	It shows
	1. the status, available, offline , muted or something else etc.
	2. the audio volume icon
	3. who I am connected with, and their audio volume
	4. time elapsed in current state
	5.

*/

const shouldCaptureMediaSource = (agentState = undefined, muted) => {
	return !(agentState === 'On hold' || muted === true);
};

class UpperBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			localStream: undefined,
			audioInputDevice: undefined,
		}
	}

	componentDidMount() {
		if (!shouldCaptureMediaSource(this.state.agentState, this.state.muted)) {
			return;
		}
		console.warn("not muted. try to grab stream");
		agentMediaManager.getDefaultOrPreferredAudioInputDevice().then(selectedDevice => {
			agentMediaManager.getUserMedia(selectedDevice).then(success => {
				this.setState({
					localStream: success,
					audioInputDevice: selectedDevice,
				});
			}, err => {
				console.error('none ', err);
			})
		});
	}

	componentWillUnmount() {
		agentMediaManager.dispose();
	}

	render() {
		const hasError = this.props.errorMessage && this.props.errorMessage.errorType;
		return (
			<div className={`row`}
				 style={{height: '182px', backgroundColor: getColorSchema(this.props.agentState), paddingTop: '5%'}}>
				{!hasError &&
				<AgentStatusAndAudioLabel agentState={this.props.agentState}
										  stream={this.state.localStream}
										  muted={this.props.muted}
										  audioInputDevice={this.state.audioInputDevice}/>}
				{!hasError &&
				<AgentMutedLabel muted={this.props.muted}/>}
				{!hasError &&
				<PeerAndAgentDuration agentState={this.props.agentState}
									  phoneNumber={this.props.phoneNumber}
									  duration={this.props.duration}
									  remoteStream={this.props.remoteStream}/>}
				{hasError &&
				<Error agentState={this.props.agentState} errorMessage={this.props.errorMessage}/>}
			</div>
		);
	}
}

UpperBody.propTypes = {
	agentState: PropTypes.string,
	duration: PropTypes.string,
	phoneNumber: PropTypes.string,
	muted: PropTypes.bool,

	remoteStream: PropTypes.object,
	errorMessage: PropTypes.object

};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState,
	duration: state.acReducer.duration,
	phoneNumber: state.acReducer.phoneNumber,
	muted: state.acReducer.muted,

	remoteStream: state.acReducer.stream,
	errorMessage: state.acReducer.errorMessage,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpperBody);
