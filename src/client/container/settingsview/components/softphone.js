import React from 'react';
import PropTypes from 'prop-types';

import circleMarkIcon from './../../../res/images/fa-circle-mark.svg';
import circleUnmarkIcon from './../../../res/images/fa-circle-unmark.svg';

import styles from './../settings.css';

const SoftPhone = ({ changeToSoftphone, enabled = false }) => (
  <div className={`row mt-2 ${styles.cursor}`}
		 onClick={changeToSoftphone}>
    <div className="col-2">
      <img src={enabled ? circleMarkIcon : circleUnmarkIcon}/></div>

    <div className="col-10 pl-0">
      <span className={styles.softphoneText}>Softphone</span>
    </div>
    <div className={`col-12 ml-1 mt-1 ${styles.outputDeviceText}`}>
			Microphone
    </div>
  </div>
);

SoftPhone.propTypes = {
  changeToSoftphone: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired
};

export default SoftPhone;
