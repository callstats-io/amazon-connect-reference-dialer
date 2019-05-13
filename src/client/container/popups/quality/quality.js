import React from 'react';
import PropTypes from 'prop-types';

import styles from './quality.css';
import { onRequestConnectivityCheck } from '../../../reducers/acReducer';
import {
  qualityAsString
} from '../../../configs/consts';
import { connect } from 'react-redux';

const Quality = ({ qualityValue = 0, requestConnectivityCheck }) => (
  <div className={`col-md-6 p-0 ${styles.qualityBox}`}>
    <div className={`row no-gutters`}>
      <span className={`col-md-12 ${styles.bandwidthQuality}`}> Bandwidth quality: <span
        className={styles.qualityText}> {qualityAsString(qualityValue)}
      </span>
      </span>
    </div>
    {
      qualityValue >= 0 && qualityValue < 3 && <div className={`row`}>
        <a className={`btn col-md-12 align-self-left text-center mt-0 pt-0 ${styles.reportACall}`}
				   onClick={requestConnectivityCheck}> Run connectivity check </a>
      </div>
    }
  </div>
);

Quality.propTypes = {
  qualityValue: PropTypes.number.isRequired,
  requestConnectivityCheck: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  requestConnectivityCheck: () => {
    dispatch(onRequestConnectivityCheck('pending'));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quality);
