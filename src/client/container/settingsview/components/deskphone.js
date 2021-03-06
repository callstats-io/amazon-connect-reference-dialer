import React from 'react';
import PropTypes from 'prop-types';

import circleMarkIcon from './../../../res/images/fa-circle-mark.svg';
import circleUnmarkIcon from './../../../res/images/fa-circle-unmark.svg';

import styles from './../settings.css';

const DeskPhone = ({ changeToDeskphone, enabled = false }) => (
  <div id='dialer_settings_desk_phone'
    className={`row mt-2 ${styles.cursor}`}
    onClick={changeToDeskphone}>

    <div className="col-2">
      <img src={enabled ? circleMarkIcon : circleUnmarkIcon}/>
    </div>
    <div className="col-10 pl-0">
      <span className={styles.deskphoneText}>Desk
				phone</span>
    </div>
  </div>
);

DeskPhone.propTypes = {
  changeToDeskphone: PropTypes.func.isRequired,
  enabled: PropTypes.bool.isRequired
};

export default DeskPhone;
