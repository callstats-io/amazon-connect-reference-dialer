import React from 'react';
import PropTypes from 'prop-types';
import styles from './../agentview.css';

import joinIcon from '../../../../res/images/fa-ico-join.svg';

const Join = ({ joinConnection, marginTop = '' }) => (
  <div className={`col-6 ${marginTop}`}>
    <a className={`btn ${styles.buttonCommon}`}
		   onClick={joinConnection}
    >
      <img src={joinIcon}/> &nbsp; Join
    </a>
  </div>
);
Join.propTypes = {
  joinConnection: PropTypes.func,
  marginTop: PropTypes.string
};

export default Join;
