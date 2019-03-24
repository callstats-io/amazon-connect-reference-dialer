import React from "react";
import PropTypes from "prop-types";
import sessionManager from './../../../api/sessionManager';

const isConnected = (currentState = "") => {
	return ['Connected', 'Joined', 'On hold', 'Hold'].includes(currentState);
};

const showPhoneNumber = (currentState = "") => {
	// console.warn('~', currentState);
	return ['Connected', 'Joined', 'Inbound call', 'Outbound call', 'On hold', 'Hold'].includes(currentState);
};

const showRemoteAudio = (currentState = "") => {
	// console.warn('~showRemoteAudio', currentState);
	return ['Connected', 'Joined', 'On hold', 'Hold'].includes(currentState);
};

const getPhoneNumber = (currentState = "") => {
	return sessionManager.getPrimaryConnectionPhone();
};

import RemoteAudioLevel from '../../audiolabelview/remoteaudiolevel';
import Duration from "../../agentduration/duration";
import styles from './agentview.css';

const PeerAndAgentDuration = ({currentState = undefined, remoteStream = undefined}) => (
	<div className={`col-md-12 ${styles.peerDurationHeight}`}>
		<div className={`row`}>
			<div className={`col-md-6`}>
				{showPhoneNumber(currentState) &&
				<span className={`m-0 ${styles.peerAndAgentDurationText}`}>
					{isConnected(currentState) ? 'With' : 'To'}
				</span>
				}
			</div>
			<div className={`col-md-6 text-right`}>
				<span className={`m-0 ${styles.peerAndAgentDurationText}`}> Time elapsed</span>
			</div>
			<div className={`col-md-6 align-self-center pr-0 mr-0`}>
				{
					showPhoneNumber(currentState) &&
					<span className={`m-0 ${styles.peerAndAgentDurationText}`}>{getPhoneNumber(currentState)}</span>
				}
			</div>
			<div className={`col-md-2 pl-0 ml-0 text-center`}>
				{showRemoteAudio(currentState) &&
				<RemoteAudioLevel remoteStream={remoteStream} viewBox={'0 100 1300 950'}/>}
			</div>
			<Duration currentState={currentState}/>
		</div>
	</div>
);

PeerAndAgentDuration.propTypes = {
	currentState: PropTypes.string,
	remoteStream: PropTypes.object,
};

export default PeerAndAgentDuration;
