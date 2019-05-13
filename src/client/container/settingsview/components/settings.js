import React from 'react';
import PropTypes from 'prop-types';

import closeOrDismissIcon from './../../../res/images/fa-close-or-dismiss.svg';
import styles from './../settings.css';

const Settings = ({ closeSettings }) => (
  <div className="row ">
    <div className="col-md-10">
      <span className={styles.settingsText}>Settings</span>
    </div>
    <div className="col-md-2"
			 onClick={closeSettings}>
      <img src={closeOrDismissIcon} className={styles.cursor}/>
    </div>
  </div>
);

Settings.propTypes = {
  closeSettings: PropTypes.func.isRequired
};

export default Settings;
