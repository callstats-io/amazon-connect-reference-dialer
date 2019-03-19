import React from "react";
import PropTypes from "prop-types";

import closeOrDismissIcon from './../../res/images/fa-close-or-dismiss.svg';
import styles from './quickconnects.css';

const FindContact = ({onContactChange, contactValue = ""}) => (
	<div className="row mt-3">
		<div className="col-md-12">
			<div className="input-group flex-nowrap">
				<input type="text"
					   className={`form-control ${styles.quickConnectSearch}`}
					   placeholder="Find a contact"
					   aria-label="contact"
					   value={contactValue}
					   onChange={onContactChange}
					   aria-describedby="addon-wrapping"/>
			</div>
		</div>
	</div>
);

FindContact.propTypes = {};

export default FindContact;
