import React from 'react';
import PropTypes from 'prop-types';
import acManager from '../../../api/acManager';
import { isAfterCallWork } from '../../../utils/acutils';
import sessionManage from '../../../api/sessionManager';

// take existing class and add disabled is it is not after call work
const getClass = (prvClass = '') => {
  const currentState = acManager.getCurrentState();
  const primaryState = sessionManage.getCurrentStateString(currentState, true);
  const secondaryState = sessionManage.getCurrentStateString(currentState, false);
  if (isAfterCallWork(primaryState) || isAfterCallWork(secondaryState)) {
    return prvClass;
  }
  return `${prvClass} disabled`;
};
const ReportACall = ({ id = '', divClass = '', linkClass = '', style = {}, onClickHandler }) => (
  <div className={divClass}>
    <a id={id}
      className={getClass(linkClass)}
      style={style}
      onClick={onClickHandler}
    > Report a call issue </a>
  </div>
);

ReportACall.propTypes = {
  id: PropTypes.string,
  divClass: PropTypes.string,
  linkClass: PropTypes.string,
  style: PropTypes.object,
  onClickHandler: PropTypes.func.isRequired
};

export default ReportACall;
