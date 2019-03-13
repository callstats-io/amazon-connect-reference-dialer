import React from "react";
import PropTypes from "prop-types";

import circleMarkIcon from './../../../res/images/fa-circle-mark.svg';
import circleUnmarkIcon from './../../../res/images/fa-circle-unmark.svg';

const DeskPhone = ({changeToDeskphone, enabled = false}) => (
	<div className="row" style={{cursor: 'pointer'}}
		 onClick={changeToDeskphone}>
		<div className="col-md-2">
			<img src={softphoneEnabled ? circleUnmarkIcon : circleMarkIcon}/>
		</div>
		<div className="col-md-10">
			<p style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber', marginTop: '1%'}}>Desk
				phone</p>
		</div>
	</div>
);

DeskPhone.propTypes = {
	changeToDeskphone: PropTypes.func.isRequired,
	enabled: PropTypes.bool.isRequired,
};

export default DeskPhone;
