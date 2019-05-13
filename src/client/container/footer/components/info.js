import React from 'react';
import PropTypes from 'prop-types';

import infoIcon from '../../../res/images/fa-info.svg';

const Info = ({ divClass = '', linkClass = '', style = {}, onClickHandler }) => (
  <div className={divClass}>
    <a className={linkClass}
		   style={style}
		   onClick={onClickHandler}
    > <img src={infoIcon}/> Info </a>
  </div>
);

Info.propTypes = {
  divClass: PropTypes.string,
  linkClass: PropTypes.string,
  style: PropTypes.object,
  onClickHandler: PropTypes.func.isRequired
};

export default Info;
