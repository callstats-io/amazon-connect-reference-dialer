import React from 'react';
import PropTypes from 'prop-types';
import styles from './../agentview.css';

import resumeIcon from '../../../../res/images/fa-resume.svg';

const ResumeAll = ({ resumeAll, marginTop = '' }) => (
  <div className={`col-md-6 ${marginTop}`}>
    <a className={`btn ${styles.buttonCommon}`}
		   onClick={resumeAll}
    >
      <img src={resumeIcon}/> &nbsp; Resume all
    </a>
  </div>
);
ResumeAll.propTypes = {
  resumeAll: PropTypes.func,
  marginTop: PropTypes.string
};

export default ResumeAll;
