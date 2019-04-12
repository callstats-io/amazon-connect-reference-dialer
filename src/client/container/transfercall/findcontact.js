import React from "react";
import PropTypes from "prop-types";
import styles from './transfercall.css';

const FindContact = ({contactChange, dialNumber, contactValue = ""}) => (
	<div className="row mt-3">
		<div className="col-md-9 pr-0 mr-0">
			<div className="input-group flex-nowrap">
				<input type="text"
					   className={`form-control ${styles.quickConnectSearch}`}
					   placeholder="Find a contact"
					   aria-label="contact"
					   value={contactValue}
					   onChange={contactChange}
					   aria-describedby="addon-wrapping"/>
			</div>
		</div>
		<div className={`col-md-3 text-right pl-0 mr-0`}>
			<a className={`btn ${styles.callPhoneDialButton}`} onClick={dialNumber}>
				Dial
			</a>
		</div>
	</div>
);

FindContact.propTypes = {
	contactChange: PropTypes.func.isRequired,
	dialNumber: PropTypes.func.isRequired,
	contactValue: PropTypes.string
};
export default FindContact;
