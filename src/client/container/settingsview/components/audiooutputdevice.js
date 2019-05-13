import React from 'react';
import PropTypes from 'prop-types';

import styles from './../settings.css';

const AudioOutputDevice = ({ audioOutputDevice = undefined }) => (
  <div className="col-md-12 mt-1">
    <div className={'row'}>
      <div className={'col-md-12'}>
        <span className={`ml-1 ${styles.outputDeviceText}`}> Audio output device </span>
      </div>
    </div>

    <div className={'row'}>
      <div className={'col-md-12'}>
        <span className={`ml-1 ${styles.outputDeviceNameText}`}> {audioOutputDevice.label} </span>
      </div>
    </div>
  </div>
);

AudioOutputDevice.propTypes = {
  audioOutputDevice: PropTypes.object.isRequired
};
export default AudioOutputDevice;
