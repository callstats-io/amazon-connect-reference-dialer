import React from 'react';
import PropTypes from 'prop-types';

import downloadIcon from '../../../res/images/fa-download.svg';

const DownloadLogs = ({ divClass = '', linkClass = '', style = {}, onClickHandler }) => (
  <div className={divClass}>
    <a id='dialer_settings_download_logs'
      className={linkClass}
      style={style}
      onClick={onClickHandler}
    > <img src={downloadIcon}/> Download logs </a>
  </div>
);

DownloadLogs.propTypes = {
  divClass: PropTypes.string,
  linkClass: PropTypes.string,
  style: PropTypes.object,
  onClickHandler: PropTypes.func.isRequired
};

export default DownloadLogs;
