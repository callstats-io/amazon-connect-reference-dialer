import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AcceptOrReject from '../footer/components/acceptOrReject';
import AvailableOrEnd from '../footer/components/availableOrEnd';

import sessionManager from '../../api/sessionManager';
import feedbackHandler from '../../api/feedbackHandler';
import lo from 'lodash';
import csioHandler from '../../api/csioHandler';

const AgentViewStyle = {
  accept: {
    divClass: 'col-6',
    linkClass: 'btn',
    style: {
      height: '36px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
      backgroundColor: '#0e9526',
      fontFamily: 'AmazonEmber',
      textAlign: 'center',
      color: '#ffffff',
      borderRadius: '0px',
      cursor: 'pointer'
    }
  },
  reject: {
    divClass: 'col-6',
    linkClass: 'btn',
    style: {
      height: '36px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
      backgroundColor: '#c91922',
      fontFamily: 'AmazonEmber',
      textAlign: 'center',
      color: '#ffffff',
      borderRadius: '0px',
      cursor: 'pointer'
    }
  },
  available: {
    divClass: 'col-12',
    linkClass: 'btn w-100',
    style: {
      height: '36px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
      backgroundColor: '#3885de',
      color: '#ffffff',
      fontFamily: 'AmazonEmber',
      fontSize: '14px',
      borderRadius: '0px',
      cursor: 'pointer'
    }
  },
  end: {
    divClass: 'col-12',
    linkClass: 'btn w-100',
    style: {
      height: '36px',
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
      backgroundColor: '#c91922',
      color: '#ffffff',
      fontFamily: 'AmazonEmber',
      fontSize: '14px',
      borderRadius: '0px',
      cursor: 'pointer'
    }
  }
};

const getCurrentStateString = (currentState = undefined) => {
  let state = lo.get(currentState, 'primaryConnectionState.state', 'none');
  if (state === 'none') {
    state = lo.get(currentState, 'thirdPartyConnectionState.state', 'none');
  }
  return state;
};

const isConference = (currentState = undefined) => {
  return currentState && currentState.primaryConnectionState && currentState.thirdPartyConnectionState;
};

const isPrimaryConnection = (currentState = undefined) => {
  return currentState && currentState.primaryConnectionState && !currentState.thirdPartyConnectionState;
};

const isSingle = (currentState = undefined) => {
  let callCount = 0;
  callCount += currentState && currentState.primaryConnectionState ? 1 : 0;
  callCount += currentState && currentState.thirdPartyConnectionState ? 1 : 0;
  return callCount === 1;
};

const setAvailable = () => {
  if (!feedbackHandler.showFeedbackReports()) {
    csioHandler.sendFeedbackRating(feedbackHandler.getFeedbackRatings());
    feedbackHandler.updateFeedback(0);
    sessionManager.setAgentAvailable();
    return;
  }
  jQuery('#confirmReportIssue').modal('show');
};

const hangupCall = () => {
  sessionManager.hangupContact();
};

const rejectCall = () => {
  sessionManager.rejectCall();
};

const acceptCall = () => {
  sessionManager.acceptCall();
};

const _showAvailable = (currentState = undefined) => {
  const agentState = getCurrentStateString(currentState);
  // console.warn('~_showAvailable', currentState, agentState);
  return !_showEndCall(currentState) &&
		!_acceptRejectCall(currentState) &&
		agentState !== 'Available' && agentState !== 'none';
};

const _showEndCall = (currentState = undefined) => {
  const agentState = getCurrentStateString(currentState);
  // console.warn('~_showEndCall', currentState, agentState);
  return ['Connected', 'Joined', 'Outbound Call', 'Outbound call', 'On hold', 'Hold', 'Connecting'].includes(agentState);
};

const _acceptRejectCall = (currentState = undefined) => {
  const agentState = getCurrentStateString(currentState);
  return ['Inbound Call', 'Inbound call', 'Callback incoming'].includes(agentState);
};

const Footer = ({ currentState = {} }) => (
  <div className="card-footer" style={{ backgroundColor: 'inherit', borderTop: 0 }}>
    {
      _showAvailable(currentState) &&
			<AvailableOrEnd
			  divClass={AgentViewStyle.available.divClass}
			  linkClass={AgentViewStyle.available.linkClass}
			  style={AgentViewStyle.available.style}
			  text={'Set to Available'}
			  onClickHandler={setAvailable}/>
    }
    {
      _showEndCall(currentState) &&
			<AvailableOrEnd divClass={AgentViewStyle.end.divClass}
			  linkClass={AgentViewStyle.end.linkClass}
			  style={AgentViewStyle.end.style}
			  text={isSingle(currentState) ? ' End call' : ' Leave call'}
			  isEnded={true}
			  onClickHandler={hangupCall}/>

    }
    {
      _acceptRejectCall(currentState) &&
			<div className="row">
			  <AcceptOrReject
			    divClass={AgentViewStyle.accept.divClass}
			    linkClass={AgentViewStyle.accept.linkClass}
			    style={AgentViewStyle.accept.style}
			    text={'Accept call'}
			    onClickHandler={acceptCall}/>

			  <AcceptOrReject divClass={AgentViewStyle.reject.divClass}
			    linkClass={AgentViewStyle.reject.linkClass}
			    style={AgentViewStyle.reject.style}
			    text={' Reject call'}
			    isReject={true}
			    onClickHandler={rejectCall}/>
			</div>
    }

  </div>
);

Footer.propTypes = {
  currentState: PropTypes.object
};
const mapStateToProps = state => ({
  currentState: state.acReducer.currentState
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
