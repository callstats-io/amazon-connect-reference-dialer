import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import tickGreenIcon from '../../../res/images/fa-tick-green.svg';
import dangerIcon from '../../../res/images/fa-danger.svg';

import lo from 'lodash';
import styles from './../connectivitycheck.css';

const getLatestResultFractionalLoss = (pctResult) => {
  let lastRecord = lo.last(pctResult) || {};
  if ('fractionalLoss' in lastRecord) {
    return lastRecord.fractionalLoss;
  }
  return -1;
};

const isOK = (pctResult) => {
  let latestResult = getLatestResultFractionalLoss(pctResult);
  // console.warn('---->', latestResult, latestResult > -1 && latestResult < 0.05);
  return latestResult > -1 && latestResult < 0.05;
};

const formatValue = (value = 0) => {
  value = Math.max(value, 0);
  return parseFloat(value).toFixed(2);
};

const FractionalLoss = ({ pctResult = {} }) => (
  <div className="row mt-1">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-8">
          <span className={styles.resultText}>
            <img src={isOK(pctResult) ? tickGreenIcon : dangerIcon}/>
            <span className="ml-1">Packet loss</span></span>
        </div>
        <div className="col-md-4 text-right">
          <span className={styles.resultValue}>
            {formatValue(getLatestResultFractionalLoss(pctResult))} % </span>
        </div>
      </div>
    </div>
  </div>
);

FractionalLoss.propTypes = {
  pctResult: PropTypes.array
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FractionalLoss);
