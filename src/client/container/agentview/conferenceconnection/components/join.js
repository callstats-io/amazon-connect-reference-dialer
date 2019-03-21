import React from "react";
import PropTypes from "prop-types";
import styles from './../agentview.css';

import resumeIcon from '../../../../res/images/fa-resume.svg';

const Join = ({joinConnection, marginTop = ""}) => (
	<div className={`col-md-6 ${marginTop}`}>
		<a className={`btn ${styles.buttonCommon}`}
		   onClick={joinConnection}
		   href="#">
			<img src={resumeIcon}/> &nbsp; Resume all
		</a>
	</div>
);
Join.propTypes = {
	joinConnection: PropTypes.func,
	marginTop: PropTypes.string
};

export default Join;
