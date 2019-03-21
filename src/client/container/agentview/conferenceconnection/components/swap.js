import React from "react";
import PropTypes from "prop-types";
import styles from './../agentview.css';

import resumeIcon from '../../../../res/images/fa-resume.svg';

const Swap = ({swapConnection, marginTop = ""}) => (
	<div className={`col-md-6 ${marginTop}`}>
		<a className={`btn ${styles.buttonCommon}`}
		   onClick={swapConnection}
		   href="#">
			<img src={resumeIcon}/> &nbsp; Swap
		</a>
	</div>
);
Swap.propTypes = {
	swapConnection: PropTypes.func,
	marginTop: PropTypes.string
};

export default Swap;
