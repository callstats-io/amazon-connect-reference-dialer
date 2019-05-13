import React from 'react';
import PropTypes from 'prop-types';
import styles from './login.css';

const CCPInputBox = ({ ccpURLChange, ccpURL = '' }) => (
  <div className="col-md-12 mt-2">
    <div className="input-group flex-nowrap">
      <input type="text"
        className={`form-control ${styles.ccpInputBox}`}
        placeholder="callstatsio.awsapps.com"
        aria-label="contact"
        value={ccpURL}
        onChange={ccpURLChange}
        aria-describedby="addon-wrapping"/>
    </div>
  </div>
);

CCPInputBox.propTypes = {
  ccpURLChange: PropTypes.func.isRequired,
  ccpURL: PropTypes.string
};
export default CCPInputBox;
