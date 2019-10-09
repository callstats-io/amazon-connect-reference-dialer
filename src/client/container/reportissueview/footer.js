import React from 'react';
import PropTypes from 'prop-types';

import styles from './reportissue.css';

const Footer = ({ submitIssue }) => (
  <div className={`card-footer m-0 p-0 ${styles.footerMain}`}>
    <div className="row">
      <div className="col-12">
        <a id='dialer_report_issue_submit'
          className={`btn w-100 ${styles.footerSubmit}`}
          onClick={submitIssue}> Submit</a>
      </div>
    </div>
  </div>
);
Footer.propTypes = {
  submitIssue: PropTypes.func.isRequired
};
export default Footer;
