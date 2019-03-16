import React from "react";
import PropTypes from "prop-types";


import circleMarkIcon from './../../../res/images/fa-circle-mark.svg';
import circleUnmarkIcon from './../../../res/images/fa-circle-unmark.svg';

import styles from './../settings.css';

const SoftPhone = ({changeToSoftphone, enabled = false}) => (
	<div className={`row ${styles.cursor}`}
		 onClick={changeToSoftphone}>
		<div className="col-md-2">
			<img src={enabled ? circleMarkIcon : circleUnmarkIcon}/></div>

		<div className="col-md-10">
			<span className={styles.softphoneText}>Softphone</span>
		</div>
	</div>
);

SoftPhone.propTypes = {
	changeToSoftphone: PropTypes.func.isRequired,
	enabled: PropTypes.bool.isRequired,
};

export default SoftPhone;
