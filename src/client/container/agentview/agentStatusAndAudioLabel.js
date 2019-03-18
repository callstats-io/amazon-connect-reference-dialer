import React from "react";
import PropTypes from "prop-types";

import AudioLevel from '../audiolabelview/audiolevel';
import NoAudioLabel from '../audiolabelview/noaudio';
import styles from './agentview.css';

const showAudioLabel = (agentState = undefined, muted) => {
	return !(agentState === 'On hold' || muted === true);
};

const AgentStatusAndAudioLabel = ({agentState, stream, muted, audioInputDevice}) => (
	<div className={`col-md-12 ${styles.agentStateDiv}`}>
		<div className={'row'}>
			<div className={`col-md-9`}>
				<span className={`m-0 ${styles.agentState}`}> {agentState} </span>
			</div>
			<div className={`col-md-3 text-right`}>
				{showAudioLabel(agentState, muted) ?
					<AudioLevel stream={stream}
								audioInputDevice={audioInputDevice}/> : <NoAudioLabel/>
				}
			</div>
		</div>
	</div>
);


AgentStatusAndAudioLabel.propTypes = {
	agentState: PropTypes.string,
	stream: PropTypes.object,
	muted: PropTypes.bool,
	audioInputDevice: PropTypes.object,
};
export default AgentStatusAndAudioLabel;
