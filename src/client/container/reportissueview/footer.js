import React from "react";
import PropTypes from "prop-types";

import styles from './reportissue.css';

const Footer = ({submitIssue}) => (
	<div className={`card-footer m-0 p-0 ${styles.footerMain}`}>
		<div className="row">
			<div className="col-md-12">
				<a className={`btn w-100 ${styles.footerSubmit}`}
				   href="#"
				   onClick={submitIssue}> Submit</a>
			</div>
		</div>
	</div>
);
Footer.propTypes = {
	submitIssue: PropTypes.func.isRequired
};
export default Footer;
