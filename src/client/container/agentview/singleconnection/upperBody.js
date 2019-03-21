import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import mediaManager from "../../../api/mediaManager";

import AgentStatusAndAudioLabel from "./agentStatusAndAudioLabel";
import AgentMutedLabel from "./agentMutedLabel";
import PeerAndAgentDuration from "./peerAndAgentDuration";
import {getColorSchema} from '../../../utils/agetStateMap';
import Error from '../../errors/index';
import lo from "lodash";


const getCurrentStateString = (currentState = undefined) => {
	const state = lo.get(currentState, 'primaryConnectionState.state', 'none');
	return state;
};

const shouldCaptureMediaSource = (currentState = undefined, muted) => {
	const state = getCurrentStateString(currentState);
	return !(['On hold', 'Hold'].includes(state) || muted === true);
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
		// if (!shouldCaptureMediaSource(this.state.agentState, this.state.muted)) {
		// 	return;
		// }
		// agentMediaManager.getDefaultOrPreferredAudioInputDevice().then(selectedDevice => {
		// 	agentMediaManager.getUserMedia(selectedDevice).then(success => {
		// 		this.setState({
		// 			localStream: success,
		// 			audioInputDevice: selectedDevice,
		// 		});
		// 	}, err => {
		// 		console.error('none ', err);
		// 	})
		// });
	}

	componentWillUnmount() {
		mediaManager.dispose();
	}

	render() {
		const hasError = this.props.errorMessage && this.props.errorMessage.errorType;
		const state = getCurrentStateString(this.props.currentState);

		return (
			<div className={`row`}
				 style={{height: '182px', backgroundColor: getColorSchema(state), paddingTop: '5%'}}>
				{!hasError &&
				<AgentStatusAndAudioLabel currentState={state}
										  stream={this.state.localStream}
										  muted={this.props.muted}
										  audioInputDevice={this.state.audioInputDevice}/>}
				{/*{!hasError &&
				<AgentMutedLabel muted={this.props.muted}/>}
				{!hasError &&
				<PeerAndAgentDuration agentState={this.props.agentState}
									  phoneNumber={this.props.phoneNumber}
									  duration={this.props.duration}
									  remoteStream={this.props.remoteStream}/>}*/}
				{hasError &&
				<Error errorMessage={this.props.errorMessage}/>}
			</div>
		);
	}
}

UpperBody.propTypes = {
	currentState: PropTypes.object,
	muted: PropTypes.bool,
	remoteStream: PropTypes.object,
	errorMessage: PropTypes.object

};
const mapStateToProps = state => ({
	currentState: state.acReducer.currentState,
	muted: state.acReducer.muted,
	remoteStream: state.acReducer.stream,
	errorMessage: state.acReducer.errorMessage,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpperBody);
