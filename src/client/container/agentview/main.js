import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../header/index';

import ConferenceConnection from './conferenceconnection/index';
import PrimaryConnection from './primaryconnection/index';
import ThirdPartyConnection from './thirdparyconnection/index';
import Footer from './footer';

import sessionManager from './../../api/sessionManager';

const AgentView = ({ currentState = undefined }) => (
  <div className={`row h-100`}>
    <div className={`col-md-12`} style={{ padding: '0' }}>
      <div className={`card h-100`} style={{ backgroundColor: '#f2f2f2' }}>
        <Header/>
        {sessionManager.isConference(currentState)
          ? <ConferenceConnection/> : sessionManager.isOnlyPrimary(currentState)
            ? <PrimaryConnection/>
            : <ThirdPartyConnection/>}
        <Footer/>
      </div>
    </div>
  </div>
);

AgentView.propTypes = {
  currentState: PropTypes.object
};
const mapStateToProps = state => ({
  currentState: state.acReducer.currentState
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AgentView);
