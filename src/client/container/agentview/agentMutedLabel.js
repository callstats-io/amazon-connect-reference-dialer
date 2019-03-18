import React from "react";
import PropTypes from "prop-types";
import agentMicMutedIcon from '../../res/images/muted-icon.svg';
import styles from './agentview.css';

const getAudioState = (muted) => {
	return muted === true ? 'MUTED' : 'ON';
};


const AgentMutedLabel = ({muted = false}) => (
	<div className={`col-md-12 text-right ${styles.agentMutedState}`}>
		<span className={styles.agentMutedText}> Your Audio: {getAudioState(muted)}
			</span>
		{muted && <span className={styles.agentMutedSpan}>
		<img className={styles.agentMutedIcon} src={agentMicMutedIcon}/> </span>}
	</div>
);

AgentMutedLabel.propTypes = {
	muted: PropTypes.bool,
};

export default AgentMutedLabel;
