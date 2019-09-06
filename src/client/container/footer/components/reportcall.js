import React from 'react';
import PropTypes from 'prop-types';

const ReportACall = ({ divClass = '', linkClass = '', style = {}, onClickHandler }) => (
  <div className={divClass}>
    <a className={linkClass}
		   style={style}
		   onClick={onClickHandler}
    > Report a call
			issue </a>
  </div>
);

ReportACall.propTypes = {
  divClass: PropTypes.string,
  linkClass: PropTypes.string,
  style: PropTypes.object,
  onClickHandler: PropTypes.func.isRequired
};

export default ReportACall;
