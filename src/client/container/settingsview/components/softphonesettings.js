import React from "react";
import PropTypes from "prop-types";


import circleMarkIcon from './../../../res/images/fa-circle-mark.svg';
import circleUnmarkIcon from './../../../res/images/fa-circle-unmark.svg';

const SoftPhoneSettings = ({changeToSoftphone, enabled}) => (
	<div className="row">

		<div className="col-md-2 pl-0 pr-0">
			<AudioLevel backgroundColor={'#ffffff'} stream={this.state.stream}/>
		</div>
	</div>
);

SoftPhoneSettings.propTypes = {
	changeToSoftphone: PropTypes.func.isRequired,
	enabled: PropTypes.bool.isRequired,
};

export default SoftPhoneSettings;
