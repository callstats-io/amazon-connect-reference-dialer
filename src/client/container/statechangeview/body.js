import React from 'react';
import { connect } from 'react-redux';

import activeIcon from '../../res/images/fa-tick-mark.svg';
import PropTypes from 'prop-types';
import lo from 'lodash';

import styles from './statuschange.css';

import {
  onRequestAgentStateChange
} from '../../reducers/acReducer';

import sessionManage from '../../api/sessionManager';

// change state using api
const changeAgentState = (currentAgentState) => {
  sessionManage.setAgentState(currentAgentState).then(success => _, err => console.error('->', err));
};

const isCurrentState = (currentAgentState, currentState) => {
  const state = lo.get(currentState, 'primaryConnectionState.state', '');
  return currentAgentState && currentAgentState.name === state;
};

const Body = ({ currentState = {}, requestAgentStateChange }) => (
  <div className={`card-body`}>
    {sessionManage.getAgentStates().map((currentAgentState) => (
      <div key={`agent-state-${currentAgentState.name}`} className={`row ${styles.acPointer} ${styles.acList}`}
        onClick={() => requestAgentStateChange(currentAgentState)}>
        <div className="col-2">
          {isCurrentState(currentAgentState, currentState) && <img src={activeIcon}/>}
        </div>
        <div className="col-10">
          <span
            className={`${isCurrentState(currentAgentState, currentState) ? styles.acSpanSelected : styles.acSpanNormal}`}> {currentAgentState.name}</span>
        </div>
      </div>
    ))}
  </div>
);

Body.propTypes = {
  currentState: PropTypes.object,
  requestAgentStateChange: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  currentState: state.acReducer.currentState
});

const mapDispatchToProps = dispatch => ({
  requestAgentStateChange: (currentAgentState) => {
    changeAgentState(currentAgentState);
    dispatch(onRequestAgentStateChange('complete'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
