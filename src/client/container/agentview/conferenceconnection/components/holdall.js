import React from 'react';
import PropTypes from 'prop-types';
import styles from './../agentview.css';
import holdIcon from '../../../../res/images/fa-hold.svg';

const HoldAll = ({ holdAll, marginTop = '' }) => (
  <div className={`col-6 ${marginTop}`}>
    <a className={`btn ${styles.buttonCommon}`}
		   onClick={holdAll}
    >
      <img src={holdIcon}/> &nbsp; Hold all
    </a>
  </div>
);
HoldAll.propTypes = {
  holdAll: PropTypes.func,
  marginTop: PropTypes.string
};

export default HoldAll;
