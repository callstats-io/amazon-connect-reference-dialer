import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import statusChangeIcon from '../../res/images/change-status-icon.svg';
import dialerSettingIcon from '../../res/images/dialer-setting-icon.svg';
import csioLogo from '../../res/images/csioLogo.png';

import NetworkStrength from '../networkstrengthview/index';
import { onRequestAgentSettingsChange, onRequestAgentStateChange } from '../../reducers/acReducer';
import { connect } from 'react-redux';

import styles from './header.css';
import Quality from '../popups/quality/quality';
import networkStrengthMonitor from '../../api/networkStrengthMonitor';
import { sleep } from './../../utils/acutils';
import sessionManage from '../../api/sessionManager';

const CSIOLogo = () => (
  <div className={`col-2 m-0 p-0 text-center`}>
    <img src={csioLogo} className={styles.csioLogo}/>
  </div>
);

const ChangeStatus = ({ onClickHandler, currentState = undefined }) => (
  <div
    className={`col-10 m-0 p-0 pl-1 ${styles.csioChangeStatus} ${sessionManage.isActive(currentState) && styles.disabledDiv}`}
    onClick={onClickHandler}>
    <span className={styles.csioHeaderText}>Change status</span>
    <SVG src={statusChangeIcon}/>
  </div>
);

const NetworkStrengthChange = ({ toggleShowNetworkStatus }) => (
  <div className={`col-2 pl-0 ml-0 pr-0 mr-0 my-auto text-center`}>
    <NetworkStrength toggleShowNetworkStatus={toggleShowNetworkStatus}/>
  </div>
);
NetworkStrengthChange.propTypes = {
  toggleShowNetworkStatus: PropTypes.func.isRequired
};

const DialerSettings = ({ onClickHandler }) => (
  <div className={`col-2 border-left ${styles.acPointer} ${styles.leftBorder}`}
    onClick={onClickHandler}>
    <img src={dialerSettingIcon} className={styles.dialerImage}/>
  </div>
);

class Header extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      isOpen: false,
      showNetworkStatus: false
    };
    this.show = false;
    this.requestAgentStateChangeFunc = this.requestAgentStateChangeFunc.bind(this);
    this.toggleShowNetworkStatus = this.toggleShowNetworkStatus.bind(this);
  }

  requestAgentStateChangeFunc () {
    const { requestAgentStateChange } = this.props;
    if (requestAgentStateChange === 'pending') {
      this.props.requestAgentStateChangeFunc('close');
    } else {
      this.props.requestAgentStateChangeFunc('pending');
    }
  }

  toggleShowNetworkStatus (show) {
    this.show = show;
    sleep(show ? 0 : 500).then(() => {
      this.setState({
        showNetworkStatus: this.show
      });
    });
  }

  render () {
    const { emptyBody, currentState } = this.props;

    return (
      <div
        className={`card-header pt-0 pb-0 mt-0 mb-0 ${styles.acHeader} ${emptyBody === true && styles.disable}`}>
        <div className={`row h-100`}>
          <div className={'col-8 my-auto'}>
            <div className={`row`}>
              <CSIOLogo/>
              <ChangeStatus onClickHandler={this.requestAgentStateChangeFunc}
                currentState={currentState}/>
            </div>
          </div>
          <NetworkStrengthChange toggleShowNetworkStatus={this.toggleShowNetworkStatus}/>
          <DialerSettings onClickHandler={this.props.requestAgentSettingsChange}/>
        </div>
        {
          emptyBody !== true && this.state.showNetworkStatus &&
                    <div className={`row text-center justify-content-end`}
                      onMouseEnter={() => this.toggleShowNetworkStatus(true)}
                      onMouseLeave={() => this.toggleShowNetworkStatus(false)}>
                      <Quality qualityValue={networkStrengthMonitor.getNetworkStrength()}/>
                    </div>
        }
      </div>
    );
  }
}

Header.propTypes = {
  emptyBody: PropTypes.bool,
  currentState: PropTypes.object,
  requestAgentStateChange: PropTypes.string,
  requestAgentStateChangeFunc: PropTypes.func.isRequired,
  requestAgentSettingsChange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentState: state.acReducer.currentState,
  requestAgentStateChange: state.acReducer.requestAgentStateChange
});

const mapDispatchToProps = dispatch => ({
  requestAgentStateChangeFunc: (value) => {
    dispatch(onRequestAgentStateChange(value));
  },
  requestAgentSettingsChange: () => {
    dispatch(onRequestAgentSettingsChange('pending'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
