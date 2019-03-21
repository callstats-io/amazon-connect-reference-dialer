import React from "react";
import PropTypes from "prop-types";
import sessionManager from './../../../api/sessionManager';

import AudioLevel from '../../audiolabelview/audiolevel';
import NoAudioLabel from '../../audiolabelview/noaudio';
import styles from './agentview.css';

const showAudioLabel = (state = null, muted) => {
	return !(['On hold', 'Hold'].includes(state) || muted === true);
};

const AgentStatusAndAudioLabel = ({currentState, stream, muted, audioInputDevice}) => (
	<div className={`col-md-12 ${styles.agentStateDiv}`}>
		<div className={'row'}>
			<div className={`col-md-9`}>
				<span className={`m-0 ${styles.agentState}`}> {currentState} </span>
			</div>
			<div className={`col-md-3 text-right`}>
				{showAudioLabel(currentState, muted) ?
					<AudioLevel stream={stream}
								audioInputDevice={audioInputDevice}
								agentStateFn={sessionManager.getPrimaryAgentState}
					/> : <NoAudioLabel/>
				}
			</div>
		</div>
	</div>
);


AgentStatusAndAudioLabel.propTypes = {
	currentState: PropTypes.string,
	stream: PropTypes.object,
	muted: PropTypes.bool,
	audioInputDevice: PropTypes.object,
};
export default AgentStatusAndAudioLabel;
