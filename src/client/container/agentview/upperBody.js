import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import agentMediaManager from "../../api/agentMediaManager";

import AgentStatusAndAudioLabel from "./agentStatusAndAudioLabel";
import AgentMutedLabel from "./agentMutedLabel";
import PeerAndAgentDuration from "./peerAndAgentDuration";
import {getColorSchema} from './../../utils/agetStateMap';
import Error from './../errors/index';

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
		this.state = {
			stream: undefined,
		}
	}

	componentDidMount() {
		agentMediaManager.getDefaultOrPreferredAudioInputDevice().then(selectedDevice => {
			agentMediaManager.getUserMedia(selectedDevice).then(success => {
				this.setState({
					stream: success,
				});
			}, err => {
				console.error('none');
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
				<AgentStatusAndAudioLabel stream={this.state.stream}
										  agentState={this.props.agentState}
										  muted={this.props.muted}/>}
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
