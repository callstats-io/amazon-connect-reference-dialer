import React from "react";
import PropTypes from "prop-types";

import MuteUnmute from './togglemute';
import ResumeAll from './resumeall';

const BothHoldView = ({muted = false, toggleMuteUnmute, resumeAll}) => (
	<div className={`row mt-3`}>
		<ResumeAll resumeAll={resumeAll}/>
		<MuteUnmute muted={muted} toggleMuteUnmute={toggleMuteUnmute}/>
	</div>
);

BothHoldView.propTypes = {
	muted: PropTypes.bool,
	toggleMuteUnmute: PropTypes.func,
	resumeAll: PropTypes.func
};

export default BothHoldView;
