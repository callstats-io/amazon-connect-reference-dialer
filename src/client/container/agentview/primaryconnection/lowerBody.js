import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuickFeedback from './quickFeedback';

import holdIcon from '../../../res/images/fa-hold.svg';
import resumeIcon from '../../../res/images/fa-resume.svg';
import muteIcon from '../../../res/images/fa-mute.svg';
import unMuteIcon from '../../../res/images/fa-mic.svg';
import dialNumberIcon from '../../../res/images/fa-dial-number.svg';
import quickConnect from '../../../res/images/fa-quick-connect.svg';
import transferIcon from '../../../res/images/fa-transfer.svg';
import { onRequestShowDialPad, onRequestShowQuickConnects, onRequestShowTransferCall } from '../../../reducers/acReducer';
import sessionManager from './../../../api/sessionManager';
import {
  isHold,
  showHoldOrMute,
  dialOrQuickConnectOrTransfer,
  isAfterCallWork,
  transferCall
} from './../../../utils/acutils';

import _ from 'lodash';
import styles from './agentview.css';

/*
Card lower body. Mainly the lower part of the card body.
It shows
1. hold
2. mute
3. dial number
4. quick connect
*/

class LowerBody extends Component {
  constructor (props) {
    super(props);

    this.toggleHold = this.toggleHold.bind(this);
    this.toggleMuteUnmute = this.toggleMuteUnmute.bind(this);
  }

  toggleHold (currentStateAsString = null) {
    let isOnHold = isHold(currentStateAsString);

    let connection = sessionManager.getPrimaryConnection();
    let promise = isOnHold ? sessionManager.resumeConnection(connection)
      : sessionManager.holdConnection(connection);
    promise.then(() => _, err => console.error(err));
  }

  toggleMuteUnmute () {
    this.props.muted ? sessionManager.unmute() : sessionManager.mute();
  }

  requestDialPad () {
    this.props.requestDialPad();
  }

  requestTransferCall () {
    this.props.requestTransferCall();
  }

  requestQuickConnect () {
    this.props.requestQuickConnect();
  }

  render () {
    const { currentState, muted } = this.props;
    const currentStateAsString = sessionManager.getCurrentStateString(currentState, true);
    const isCallOnHold = isHold(currentStateAsString);
    return (
      <div className="row">
        <div className="col-12">
          {
            showHoldOrMute(currentStateAsString) &&
            <div className="row mt-3">
              <div className="col-6">
                <a id={isCallOnHold ? 'dialer_on_call_resume' : 'dialer_on_call_hold'}
                  className={`btn ${styles.toggleHold}`}
                  onClick={() => this.toggleHold(currentStateAsString)}>
                  <img
                    src={isCallOnHold ? resumeIcon : holdIcon} /> &nbsp; {isCallOnHold ? 'Resume' : 'Hold'}
                </a>
              </div>

              <div className="col-6">
                <a id={muted ? 'dialer_on_call_unmute' : 'dialer_on_call_mute'}
                  onClick={this.toggleMuteUnmute}
                  className={`btn pl-0 pr-0 ${styles.toggleMute}`}
                > {muted ? <img src={unMuteIcon} /> : <img src={muteIcon} />}
                  {muted ? ' Unmute' : ' Mute'}
                </a>
              </div>
            </div>
          }
          {
            dialOrQuickConnectOrTransfer(currentStateAsString) &&
            <div className="row mt-3">
              <div className="col-6">
                <a id='dialer_index_dial_number' className={`btn ${styles.quickConnectOrTransfer}`}
                  onClick={() => this.requestDialPad()}>
                  <img src={dialNumberIcon} /> &nbsp;Dial number </a>
              </div>

              <div className="col-6">
                {
                  transferCall(currentStateAsString)
                    ? <a id='dialer_index_transfer_call' className={`btn pl-0 pr-0 ${styles.quickConnectOrTransfer}`}
                      onClick={() => this.requestTransferCall()}>
                      <img src={transferIcon} /> &nbsp;Transfer </a>
                    : <a id='dialer_index_quick_connects' className={`btn pl-0 pr-0 ${styles.quickConnectOrTransfer}`}
                      onClick={() => this.requestQuickConnect()}>
                      <img src={quickConnect} /> &nbsp;Quick connects </a>

                }
              </div>

            </div>
          }
          {
            isAfterCallWork(currentStateAsString) && <QuickFeedback />
          }

        </div>
      </div>
    );
  }
}

LowerBody.propTypes = {
  currentState: PropTypes.object,

  muted: PropTypes.bool.isRequired,
  requestDialPad: PropTypes.func.isRequired,
  requestQuickConnect: PropTypes.func.isRequired,
  requestTransferCall: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  currentState: state.acReducer.currentState,

  muted: state.acReducer.muted || false
});
const mapDispatchToProps = dispatch => ({
  requestDialPad: () => {
    dispatch(onRequestShowDialPad('pending'));
  },
  requestQuickConnect: () => {
    dispatch(onRequestShowQuickConnects('pending'));
  },
  requestTransferCall: () => {
    dispatch(onRequestShowTransferCall('pending'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LowerBody);
