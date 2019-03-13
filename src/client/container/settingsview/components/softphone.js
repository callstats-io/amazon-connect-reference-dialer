import React from "react";
import PropTypes from "prop-types";


import circleMarkIcon from './../../../res/images/fa-circle-mark.svg';
import circleUnmarkIcon from './../../../res/images/fa-circle-unmark.svg';

const SoftPhone = ({changeToSoftphone, enabled}) => (
	<div className="row" style={{cursor: 'pointer'}}
		 onClick={changeToSoftphone}>
		<div className="col-md-2">
			<img src={enabled ? circleMarkIcon : circleUnmarkIcon}/></div>
		<div className="col-md-10">
			<p style={{
				color: '#000000',
				fontSize: '14px',
				fontFamily: 'AmazonEmber',
				marginTop: '1%'
			}}>Softphone</p>
		</div>
	</div>
);

SoftPhone.propTypes = {
	changeToSoftphone: PropTypes.func.isRequired,
	enabled: PropTypes.bool.isRequired,
};

export default SoftPhone;
