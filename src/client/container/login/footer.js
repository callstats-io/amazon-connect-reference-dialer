import React from 'react';
import PropTypes from 'prop-types';

import styles from './login.css';

const Footer = ({ tryLogin }) => (
  <div className={`card-footer m-0 p-0 ${styles.footerMain}`}>
    <div className="row">
      <div className="col-12">
        <a className={`btn w-100 ${styles.footerLogin}`}
				   onClick={tryLogin}> Login </a>
      </div>
    </div>
  </div>
);
Footer.propTypes = {
  tryLogin: PropTypes.func
};
export default Footer;
