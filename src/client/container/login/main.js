import React from 'react';
import PropTypes from 'prop-types';

import Header from './../header/index';
import Body from './body';
import styles from './login.css';

const Login = ({ showLogin }) => (
  <div className={`row h-100`}>
    <div className={`col-12 ${styles.zeroPadding}`}>
      <div className={`card h-100 ${styles.cardBody}`}>
        <Header emptyBody={true}/>
        {showLogin && <Body/>}
      </div>
    </div>
  </div>
);

Login.propTypes = {
  showLogin: PropTypes.bool.isRequired
};

export default Login;
