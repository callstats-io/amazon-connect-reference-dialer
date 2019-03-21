import React from "react";
import PropTypes from "prop-types";


import Join from './join';
import Swap from './swap';
import HoldAll from './holdall';
import DialNumber from './dialnumber';
import MuteUnmute from './togglemute';

// join
// swap
// dial
// hold all
// mute

const OneHoldOtherConnected = ({muted = false, joinConnection, swapConnection, holdAll, dialNumber, toggleMuteUnmute}) => (
	<div className={`row mt-3`}>
		<Join joinConnection={joinConnection}/>
		<Swap swapConnection={swapConnection}/>

		<HoldAll holdAll={holdAll} marginTop={'mt-1'}/>
		<DialNumber dialNumber={dialNumber} marginTop={'mt-1'}/>

		<MuteUnmute muted={muted} toggleMuteUnmute={toggleMuteUnmute} marginTop={'mt-1'}/>
	</div>
);

OneHoldOtherConnected.propTypes = {
	muted: PropTypes.bool,
	joinConnection: PropTypes.func,
	swapConnection: PropTypes.func,
	holdAll: PropTypes.func,
	dialNumber: PropTypes.func,
	toggleMuteUnmute: PropTypes.func
};

export default OneHoldOtherConnected;
