import React, { Component } from 'react';
import styles from './login.css';
import databaseManager from '../../api/databaseManager';
import sessionManage from '../../api/sessionManager';

import CCPInputBox from './ccpinputbox';

const getCCPScope = () => {
  const ccpScope = databaseManager.getDefaultConnectURL(CONNECT_URL || WEB_PACK_CONNECT_URL);
  return ccpScope;
};

const loginURL = () => {
  const connectURL = databaseManager.getDefaultConnectURL(CONNECT_URL || WEB_PACK_CONNECT_URL);
  return `https://${connectURL}/connect/login?landat=%2Fconnect%2Fccp#/`;
};
class Body extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ccpURL: getCCPScope()
    };
    this.ccpURLChange = this.ccpURLChange.bind(this);
    this.trySignIn = this.trySignIn.bind(this);
  }

  ccpURLChange (event) {
    let { value } = event.target;
    this.setState({
      ccpURL: value
    });
  }

  trySignIn () {
    // set the current CCP URL as current one
    databaseManager.setDefaultConnectURL(this.state.ccpURL || '');

    // fetch the newly set loginIN URL
    let loginWindow = window.open(loginURL());
    sessionManage.setLoginWindow(loginWindow);
  }

  render () {
    return (
      <div className={`card-body ${styles.cardBodyMain}`}>
        <div className="row h-100">
          <div className={`col-12 my-auto`}>
            <div className={`row`}>
              <div className="col-12">
                <span className={styles.ccpInputBoxText}>Amazon Connect CCP URL</span>
              </div>
              <CCPInputBox ccpURL={this.state.ccpURL}
                ccpURLChange={this.ccpURLChange}
              />
              <div className="col-12 mt-4 text-center">
                <a className={`btn w-50 ${styles.loginText}`} onClick={this.trySignIn}> Sign in </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Body.propTypes = {};
export default Body;
