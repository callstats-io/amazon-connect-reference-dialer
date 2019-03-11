import React from "react";
import PropTypes from "prop-types";


const isConnected = (agentState) => {
	return ['Connected', 'On hold'].includes(agentState);
};

const showPhoneNumber = (agentState) => {
	return ['Connected', 'Inbound Call', 'Outbound Call', 'On hold'].includes(agentState);
};
import AudioLevel from '../audiolabelview/audiolevel';
import {getColorSchema} from './../../utils/agetStateMap';
import Duration from "../agentduration/duration";

const PeerAndAgentDuration = ({agentState = 'unknown', phoneNumber = '', remoteStream = undefined}) => (
	<div className={`col-md-12`}>
		<div className={`row`}>
			<div className={`col-md-6`}>
				{showPhoneNumber(agentState) &&
				<p className={`m-0`} style={{
					fontFamily: 'AmazonEmber',
					color: '#ffffff',
					fontSize: '14px'
				}}>
					{isConnected(agentState) ? 'With' : 'To'}
				</p>
				}
			</div>
			<div className={`col-md-6 text-right`}>
				<p className={`m-0`}
				   style={{fontFamily: 'AmazonEmber', color: '#ffffff', fontSize: '14px'}}> Time
					elapsed</p>
			</div>
			<div className={`col-md-6 align-self-center`}>
				{
					showPhoneNumber(agentState) &&
					<p className={`m-0`}
					   style={{
						   fontFamily: 'AmazonEmber',
						   color: '#ffffff',
						   fontSize: '14px'
					   }}>{phoneNumber}</p>
				}
			</div>
			<div className={`col-md-2 pl-0`}>
				{showPhoneNumber(agentState) &&
				<AudioLevel backgroundColor={getColorSchema(agentState)} stream={remoteStream}/>}
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
