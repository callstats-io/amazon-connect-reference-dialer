import React from "react";
import PropTypes from "prop-types";

import DropDownOptions from "./dropdown-options";

const SoftPhoneSettings = ({toggleMenuItem, changeAudioInputDevice, showMenuItem, inputDeviceList, audioDevice}) => (
	<div className="row">
		<DropDownOptions toggleMenuItem={toggleMenuItem}
						 changeAudioInputDevice={changeAudioInputDevice}
						 showMenuItem={showMenuItem}
						 inputDeviceList={inputDeviceList}
						 audioDevice={audioDevice}/>


	</div>
);

SoftPhoneSettings.propTypes = {
	toggleMenuItem: PropTypes.func.isRequired,
	changeAudioInputDevice: PropTypes.func.isRequired,
	showMenuItem: PropTypes.bool.isRequired,
	inputDeviceList: PropTypes.array.isRequired,
	audioDevice: PropTypes.object.isRequired,
};

export default SoftPhoneSettings;
