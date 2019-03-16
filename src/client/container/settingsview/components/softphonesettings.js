import React from "react";
import PropTypes from "prop-types";

import DropDownOptions from "./dropdown-options";
import AudioLevel from './../../audiolabelview/index';


const SoftPhoneSettings = ({toggleMenuItem, changeAudioInputDevice, showMenuItem, inputDeviceList, audioDevice, stream, backgroundColor}) => (
	<div className="row">
		<DropDownOptions toggleMenuItem={toggleMenuItem}
						 changeAudioInputDevice={changeAudioInputDevice}
						 showMenuItem={showMenuItem}
						 inputDeviceList={inputDeviceList}
						 audioDevice={audioDevice}/>
		<div className={"col-md-2 pl-0 pr-0"}>
			<AudioLevel stream={stream} backgroundColor={backgroundColor}/>
		</div>

	</div>
);

SoftPhoneSettings.propTypes = {
	toggleMenuItem: PropTypes.func.isRequired,
	changeAudioInputDevice: PropTypes.func.isRequired,
	showMenuItem: PropTypes.bool.isRequired,
	inputDeviceList: PropTypes.array.isRequired,
	audioDevice: PropTypes.object.isRequired,

	stream: PropTypes.object,
	backgroundColor: PropTypes.string,
};

export default SoftPhoneSettings;
