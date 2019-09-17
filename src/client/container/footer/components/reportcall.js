import React from 'react';
import PropTypes from 'prop-types';

const ReportACall = ({ id = '', divClass = '', linkClass = '', style = {}, onClickHandler }) => (
  <div className={divClass}>
    <a id={id}
      className={linkClass}
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
