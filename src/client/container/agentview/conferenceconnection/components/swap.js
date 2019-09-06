import React from 'react';
import PropTypes from 'prop-types';
import styles from './../agentview.css';

import swapIcon from '../../../../res/images/fa-ico-swap.svg';

const Swap = ({ swapConnection, marginTop = '' }) => (
  <div className={`col-6 ${marginTop}`}>
    <a className={`btn ${styles.buttonCommon}`}
		   onClick={swapConnection}
    >
      <img src={swapIcon}/> &nbsp; Swap
    </a>
  </div>
);
Swap.propTypes = {
  swapConnection: PropTypes.func,
  marginTop: PropTypes.string
};

export default Swap;
