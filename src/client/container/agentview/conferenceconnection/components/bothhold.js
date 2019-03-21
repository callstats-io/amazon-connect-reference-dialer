import React from "react";
import PropTypes from "prop-types";
import styles from './../agentview.css';

import resumeIcon from '../../../../res/images/fa-resume.svg';

import MuteUnmute from './togglemute';

const ResumeAll = ({resumeAll}) => (
	<div className="col-md-6">
		<a className={`btn ${styles.buttonCommon}`}
		   onClick={resumeAll}
		   href="#">
			<img src={resumeIcon}/> &nbsp; Resume all
		</a>
	</div>
);
ResumeAll.propTypes = {
	resumeAll: PropTypes.func
};

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
