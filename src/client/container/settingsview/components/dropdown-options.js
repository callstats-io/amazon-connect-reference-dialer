import React from "react";
import PropTypes from "prop-types";
import lo from 'lodash';
import styles from './../settings.css';

const truncate = (sentence = "", upto = -1) => {
	if (upto < 0) {
		return sentence;
	}
	if (sentence.length < upto) {
		return sentence;
	}

	return `${sentence.substring(0, upto - 4)} ...`;
};
const DropDownOptions = ({toggleMenuItem, changeAudioInputDevice, showMenuItem, inputDeviceList, audioInputDevice}) => (
	<div className="col-md-10 pr-0 mr-0">
		<div className={`btn-group ${styles.btnGroup}`}>
			<button className={`btn text-left ${styles.dropDownButton}`}
					type="button"
					onClick={toggleMenuItem}> {truncate(audioInputDevice.label, 30)}
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
