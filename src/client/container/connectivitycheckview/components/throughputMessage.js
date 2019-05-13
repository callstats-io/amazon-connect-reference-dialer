import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import lo from 'lodash';
import styles from './../connectivitycheck.css';

const getLatestResultThroughput = (pctResult) => {
  let lastRecord = lo.last(pctResult) || {};
  return lastRecord.throughput || 0;
};

const isBad = (pctResult) => {
  let latestResult = getLatestResultThroughput(pctResult);
  return latestResult < 20;
};

const ThroughputMessage = ({ pctResult = {} }) => (
  isBad(pctResult) && <div className="row mt-1">
    <div className="col-md-12">
      <span className={styles.resultText}> Check to
				see if you have other devices on the network consuming bandwidth. </span>
    </div>
  </div>
);

ThroughputMessage.propTypes = {
  pctResult: PropTypes.array
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThroughputMessage);
