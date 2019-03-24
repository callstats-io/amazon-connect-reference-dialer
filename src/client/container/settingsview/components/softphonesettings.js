import React from "react";
import PropTypes from "prop-types";

import DropDownOptions from "./dropdown-options";
import LocalAudiolevel from './../../audiolabelview/localaudiolevel';
import AudioOutputDevice from "./audiooutputdevice";

import styles from './../settings.css';

const SoftPhoneSettings = ({toggleMenuItem, changeAudioInputDevice, showMenuItem, inputDeviceList, audioInputDevice, audioOutputDevice}) => (
	<div className="row mt-1">
		<DropDownOptions toggleMenuItem={toggleMenuItem}
						 changeAudioInputDevice={changeAudioInputDevice}
						 showMenuItem={showMenuItem}
						 inputDeviceList={inputDeviceList}
						 audioInputDevice={audioInputDevice}/>
		<div className={`col-md-2 pl-0 pr-0 ${styles.audioLabel}`}>
			<LocalAudiolevel viewBox={'0 100 1400 1000'}/>
		</div>

		<AudioOutputDevice audioOutputDevice={audioOutputDevice}/>

	</div>
);

SoftPhoneSettings.propTypes = {
	toggleMenuItem: PropTypes.func.isRequired,
	changeAudioInputDevice: PropTypes.func.isRequired,
	showMenuItem: PropTypes.bool.isRequired,
	inputDeviceList: PropTypes.array.isRequired,
	audioInputDevice: PropTypes.object.isRequired,
	audioOutputDevice: PropTypes.object.isRequired,
};

export default SoftPhoneSettings;
