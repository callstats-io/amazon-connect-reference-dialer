import React from "react";
import PropTypes from "prop-types";
import styles from './../agentview.css';

import muteIcon from '../../../../res/images/muted-icon.svg';
import unMuteIcon from '../../../../res/images/fa-mic.svg';


const MuteUnmute = ({toggleMuteUnmute, muted = false, marginTop = ""}) => (
	<div className={`col-md-6 ${marginTop}`}>
		<a className={`btn ${styles.buttonCommon}`}
		   onClick={toggleMuteUnmute}
		   href="#">
			<img src={muted ? unMuteIcon : muteIcon}/> {muted ? ' Unmute' : ' Mute'}
		</a>
	</div>
);
MuteUnmute.propTypes = {
	muted: PropTypes.bool,
	toggleMuteUnmute: PropTypes.func,
	marginTop: PropTypes.string
};

export default MuteUnmute;
