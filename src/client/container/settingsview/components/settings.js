import React from "react";
import PropTypes from "prop-types";

import closeOrDismissIcon from './../../../res/images/fa-close-or-dismiss.svg';

const Settings = ({closeSettings}) => (
	<div className="row ">
		<div className="col-md-10">
			<p style={{color: '#000000', fontSize: '18px', fontFamily: 'AmazonEmber'}}>Settings</p>
		</div>
		<div className="col-md-2"
			 onClick={closeSettings}>
			<img src={closeOrDismissIcon} style={{cursor: 'pointer'}}/>
		</div>
	</div>
);

Settings.propTypes = {
	closeSettings: PropTypes.func.isRequired,
};

export default Settings;
