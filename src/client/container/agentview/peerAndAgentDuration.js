import React from "react";
import PropTypes from "prop-types";


const isConnected = (agentState) => {
	return ['Connected', 'Joined', 'On hold'].includes(agentState);
};

const showPhoneNumber = (agentState) => {
	return ['Connected',  'Joined', 'Inbound Call', 'Outbound Call', 'On hold'].includes(agentState);
};

import RemoteAudioLevel from '../audiolabelview/audiolevelRemote';
import Duration from "../agentduration/duration";
import styles from './agentview.css';

const PeerAndAgentDuration = ({agentState = 'unknown', phoneNumber = '', remoteStream = undefined}) => (
	<div className={`col-md-12`}>
		<div className={`row`}>
			<div className={`col-md-6`}>
				{showPhoneNumber(agentState) &&
				<span className={`m-0 ${styles.peerAndAgentDurationText}`}>
					{isConnected(agentState) ? 'With' : 'To'}
				</span>
				}
			</div>
			<div className={`col-md-6 text-right`}>
				<span className={`m-0 ${styles.peerAndAgentDurationText}`}> Time elapsed</span>
			</div>
			{/*<div className={`w-100`}></div>*/}
			<div className={`col-md-6 align-self-center pr-0 mr-0`}>
				{
					showPhoneNumber(agentState) &&
					<span className={`m-0 ${styles.peerAndAgentDurationText}`}>{phoneNumber}</span>
				}
			</div>
			<div className={`col-md-2 pl-0 ml-0 text-center`}>
					{showPhoneNumber(agentState) &&
					<RemoteAudioLevel remoteStream={remoteStream}/>}
			</div>
			<Duration/>
		</div>
	</div>
);

PeerAndAgentDuration.propTypes = {
	agentState: PropTypes.string,
	phoneNumber: PropTypes.string,
	remoteStream: PropTypes.object,
};

export default PeerAndAgentDuration;
