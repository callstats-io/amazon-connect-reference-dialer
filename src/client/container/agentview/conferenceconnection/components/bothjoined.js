import React from "react";
import PropTypes from "prop-types";
import styles from './../agentview.css';

import holdIcon from '../../../../res/images/fa-hold.svg';

import DialNumber from './dialnumber';
import MuteUnmute from './togglemute';

const HoldAll = ({holdAll}) => (
	<div className="col-md-6">
		<a className={`btn ${styles.buttonCommon}`}
		   onClick={holdAll}
		   href="#">
			<img src={holdIcon}/> &nbsp; Hold all
		</a>
	</div>
);
HoldAll.propTypes = {
	holdAll: PropTypes.func
};

const BothJoined = ({muted = false, dialNumber, holdAll, toggleMuteUnmute}) => (
	<div className={`row mt-3`}>
		<DialNumber dialNumber={dialNumber}/>
		<HoldAll holdAll={holdAll}/>
		<MuteUnmute muted={muted}
					toggleMuteUnmute={toggleMuteUnmute}
					marginTop={'mt-3'}/>
	</div>
);

BothJoined.propTypes = {
	muted: PropTypes.bool,
	dialNumber: PropTypes.func,
	toggleMuteUnmute: PropTypes.func,
	holdAll: PropTypes.func
};

export default BothJoined;
