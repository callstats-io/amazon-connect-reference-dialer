import React from "react";
import PropTypes from "prop-types";
import styles from './transfercall.css';

const FindContact = ({contactChange, contactValue = ""}) => (
	<div className="row mt-3">
		<div className="col-md-12">
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
	</div>
);

FindContact.propTypes = {
	contactChange: PropTypes.func.isRequired,
	contactValue: PropTypes.string
};
export default FindContact;
