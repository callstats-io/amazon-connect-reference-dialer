import React from "react";
import PropTypes from "prop-types";
import styles from './../agentview.css';

import dialNumberIcon from '../../../../res/images/fa-dial-number.svg';


const DialNumber = ({dialNumber, marginTop = ""}) => (
	<div className={`col-md-6 ${marginTop}`}>
		<a className={`btn ${styles.buttonCommon}`}
		   onClick={dialNumber}
		   href="#">
			<img src={dialNumberIcon}/> &nbsp; Dial number
		</a>
	</div>
);
DialNumber.propTypes = {
	dialNumber: PropTypes.func,
	marginTop: PropTypes.string,
};

export default DialNumber;
