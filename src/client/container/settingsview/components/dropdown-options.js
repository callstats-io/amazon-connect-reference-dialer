import React from "react";
import PropTypes from "prop-types";

import styles from './../settings.css';

const DropDownOptions = ({toggleMenuItem, changeAudioInputDevice, showMenuItem, inputDeviceList, audioInputDevice}) => (
	<div className="col-md-10 pr-0 mr-0">
		<div className={`btn-group ${styles.btnGroup}`}>
			<button className={`btn ${styles.dropDownButton}`}
					type="button"
					onClick={toggleMenuItem}> {audioInputDevice.label}
			</button>

			<button onClick={toggleMenuItem} type="button"
					className={`btn dropdown-toggle dropdown-toggle-split ${styles.btnDropDown}`}
					aria-haspopup="true" aria-expanded="false">
				<span className="sr-only">Toggle Dropdown</span>
			</button>
			<div className={`dropdown-menu ${showMenuItem && 'show'} ${styles.dropDownMenu}`}
				 x-placement="bottom-start">
				{
					inputDeviceList.map((item, indx) => (
						<a key={`${item.deviceId}-${indx}`} className={`dropdown-item ${styles.dropdownItem}`}
						   onClick={() => changeAudioInputDevice(item)}>{item.label}</a>
					))
				}
			</div>

		</div>
	</div>
);

DropDownOptions.propTypes = {
	toggleMenuItem: PropTypes.func.isRequired,
	changeAudioInputDevice: PropTypes.func.isRequired,
	showMenuItem: PropTypes.bool.isRequired,
	inputDeviceList: PropTypes.array.isRequired,
	audioInputDevice: PropTypes.object.isRequired,
};

export default DropDownOptions;
