import React from 'react';
import { connect } from 'react-redux';

import UpperBody from './upperBody';
import LowerBody from './lowerBody';

const ConferenceConnection = () => (
  <div className={`card-body`}
		 style={{ paddingLeft: '0.95em', paddingRight: '0.9em', paddingTop: '0' }}>
    <UpperBody/>
    <LowerBody/>
  </div>
);

ConferenceConnection.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConferenceConnection);
