import React from 'react';
import PropTypes from 'prop-types';

import versionIcon from '../../../res/images/fa-version.svg';

const Version = ({ divClass = '', linkClass = '', style = {}, onClickHandler }) => (
  <div className={divClass}>
    <a className={linkClass}
		   style={style}
		   onClick={onClickHandler}
    > <img src={versionIcon}/> {`Dialer v${window.CS_VERSION}` }</a>
  </div>
);

Version.propTypes = {
  divClass: PropTypes.string,
  linkClass: PropTypes.string,
  style: PropTypes.object,
  onClickHandler: PropTypes.func.isRequired
};

export default Version;
