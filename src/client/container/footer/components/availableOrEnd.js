import React from 'react';
import PropTypes from 'prop-types';

import dialButton from './../../../res/images/fa-dial-button.svg';

const AvailableOrEnd = ({ divClass = '', linkClass = '', style = {}, onClickHandler, text = '', isEnded = false }) => (
  <div className={'row'}>
    <div className={divClass}>
      <a className={linkClass}
			   style={style}
			   onClick={onClickHandler}>
        {isEnded && <img src={dialButton}/>}
        {text}
      </a>
    </div>
  </div>
);

AvailableOrEnd.propTypes = {
  divClass: PropTypes.string,
  linkClass: PropTypes.string,
  style: PropTypes.object,
  text: PropTypes.string.isRequired,
  isEnded: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired
};

export default AvailableOrEnd;
