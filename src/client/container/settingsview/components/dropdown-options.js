import React from 'react';
import PropTypes from 'prop-types';
import styles from './../settings.css';

import {
  truncate
} from '../../../utils/acutils';

const DropDownOptions = ({ toggleMenuItem, changeAudioInputDevice, showMenuItem, inputDeviceList, audioInputDevice = {} }) => (
  <div className="col-10 pr-0 mr-0">
    <div className={`btn-group ${styles.btnGroup}`}>
      <button id="dialer_settings_input_device" className={`btn text-left ${styles.dropDownButton}`}
        type="button"
        onClick={toggleMenuItem}> {truncate(audioInputDevice.label, 30)}
      </button>

      <button id="dialer_settings_input_device" onClick={toggleMenuItem} type="button"
        className={`btn dropdown-toggle dropdown-toggle-split ${styles.btnDropDown}`}
        aria-haspopup="true" aria-expanded="false">
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <div className={`dropdown-menu ${showMenuItem && 'show'} ${styles.dropDownMenu}`}
				 x-placement="bottom-start">
        {
          inputDeviceList.map((item, indx) => (
            <a key={`${item.deviceId}-${indx}`} className={`dropdown-item ${styles.dropdownItem}`}
						   onClick={() => changeAudioInputDevice(item)}>{ truncate(item.label, 40) }</a>
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
  inputDeviceList: PropTypes.array,
  audioInputDevice: PropTypes.object
};

export default DropDownOptions;
