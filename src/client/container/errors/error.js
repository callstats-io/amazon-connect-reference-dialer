import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import lo from 'lodash';

import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';
import { onCCPError } from '../../reducers/acReducer';

import styles from './error.css';

const formatText = (msg) => {
  if (!msg) {
    return '';
  }

  let tokens = msg.split('_');
  let retval = tokens.map(token => {
    return lo.capitalize(token);
  }).join(' ');
  return retval;
};

const Error = ({ errorMessage = {}, closeError }) => (
  <div className={`col-md-12 mr-0 ml-0`}>
    <div className={`row ml-0 mr-0 ${styles.errorDiv}`}>
      <div className={`col-md-10 mt-2 ${styles.errorDivNext}`}>
        <p className={styles.errorText}> {formatText(errorMessage.errorType)}</p>
      </div>
      <div className={`col-md-2 mt-2 ${styles.closeOrDissmiss}`}
				 onClick={closeError}>
        <img src={closeOrDismissIcon} className={styles.cursor}/>
      </div>

      <div className={'col-md-12'}>
        <p className={styles.errorMessage}>
          {errorMessage.errorMessage || ''}
        </p>
      </div>

    </div>
  </div>
);

Error.propTypes = {
  errorMessage: PropTypes.object,
  closeError: PropTypes.func.isRequired
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  closeError: () => {
    dispatch(onCCPError({}));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Error);
