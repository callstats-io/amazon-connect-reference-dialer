import React from 'react';
import PropTypes from 'prop-types';

import DialNumber from './dialnumber';
import MuteUnmute from './togglemute';
import HoldAll from './holdall';

const BothJoined = ({ muted = false, dialNumber, holdAll, toggleMuteUnmute }) => (
  <div className={`row mt-3`}>
    <DialNumber dialNumber={dialNumber}/>
    <HoldAll holdAll={holdAll}/>
    <MuteUnmute muted={muted}
      toggleMuteUnmute={toggleMuteUnmute}
      marginTop={'mt-1'}/>
  </div>
);

BothJoined.propTypes = {
  muted: PropTypes.bool,
  dialNumber: PropTypes.func,
  toggleMuteUnmute: PropTypes.func,
  holdAll: PropTypes.func
};

export default BothJoined;
