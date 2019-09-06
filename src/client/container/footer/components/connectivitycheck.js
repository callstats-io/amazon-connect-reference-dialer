import React from 'react';
import PropTypes from 'prop-types';

const ConnectivityCheck = ({ divClass = '', linkClass = '', style = {}, onClickHandler }) => (
  <div className={divClass}>
    <a className={linkClass}
		   style={style}
		   onClick={onClickHandler}
    > Connectivity
			check </a>
  </div>
);

ConnectivityCheck.propTypes = {
  divClass: PropTypes.string,
  linkClass: PropTypes.string,
  style: PropTypes.object,
  onClickHandler: PropTypes.func.isRequired
};

export default ConnectivityCheck;
