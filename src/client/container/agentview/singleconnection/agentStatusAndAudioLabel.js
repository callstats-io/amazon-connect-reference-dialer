import React from "react";
import PropTypes from "prop-types";

import AudioLevel from '../../audiolabelview2/index';
import NoAudioLabel from '../../audiolabelview/noaudio';
import styles from './agentview.css';

const showAudioLabel = (state = null, muted) => {
	return !(['On hold', 'Hold'].includes(state) || muted === true);
};

const AgentStatusAndAudioLabel = ({currentState, muted = false}) => (
	<div className={`col-md-12 ${styles.agentStateDiv}`}>
		<div className={'row'}>
			<div className={`col-md-9`}>
				<span className={`m-0 ${styles.agentState}`}> {currentState} </span>
			</div>
			<div className={`col-md-3 mr-0`}>
				{showAudioLabel(currentState, muted) ?
					<AudioLevel muted={muted}/> : <NoAudioLabel/>
				}
			</div>
		</div>
	</div>
);


AgentStatusAndAudioLabel.propTypes = {
	currentState: PropTypes.string,
	muted: PropTypes.bool,
};
export default AgentStatusAndAudioLabel;
