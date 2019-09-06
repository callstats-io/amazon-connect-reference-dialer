import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import tickGreenIcon from '../../../res/images/fa-tick-green.svg';
import dangerIcon from '../../../res/images/fa-danger.svg';

import lo from 'lodash';
import styles from './../connectivitycheck.css';

const getLatestResultThroughput = (pctResult) => {
  let lastRecord = lo.last(pctResult) || {};
  return lastRecord.throughput || 0;
};

const isOK = (pctResult) => {
  let latestResult = getLatestResultThroughput(pctResult);
  return latestResult > 20;
};

const formatValue = (value = 0) => {
  value = Math.max(value, 0);
  return parseFloat(value).toFixed(2);
};

const Throughput = ({ pctResult = {} }) => (
  <div className="row mt-1">
    <div className="col-12">
      <div className="row">
        <div className="col-8">
          <span className={styles.resultText}>
            <img src={isOK(pctResult) ? tickGreenIcon : dangerIcon}/>
            <span className="ml-1">Average throughput</span></span>
        </div>
        <div className="col-4 text-right pl-0 ml-0">
          <span className={styles.resultValue}>
            {formatValue(getLatestResultThroughput(pctResult))} kbps </span>
        </div>
      </div>
    </div>
  </div>
);

Throughput.propTypes = {
  pctResult: PropTypes.array
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Throughput);
