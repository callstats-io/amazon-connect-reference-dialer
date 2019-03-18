import React from "react";
import PropTypes from "prop-types";


const isConnected = (agentState) => {
	return ['Connected', 'On hold'].includes(agentState);
};

const showPhoneNumber = (agentState) => {
	return ['Connected', 'Inbound Call', 'Outbound Call', 'On hold'].includes(agentState);
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
			<div className={`col-md-6 align-self-center`}>
				{
					showPhoneNumber(agentState) &&
					<p className={`m-0 ${styles.peerAndAgentDurationText}`}>{phoneNumber}</p>
				}
			</div>
			<div className={`col-md-2 pl-0`}>
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
