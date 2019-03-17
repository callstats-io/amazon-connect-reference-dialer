import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";


import tickGreenIcon from '../../../res/images/fa-tick-green.svg';
import dangerIcon from '../../../res/images/fa-danger.svg';

import lo from 'lodash';
import styles from './../connectivitycheck.css';

const getLatestResultRTT = (pctResult) => {
	let lastRecord = lo.last(pctResult) || {};
	return lastRecord.rtt || 0;
};

const isOK = (pctResult) => {
	let latestResult = getLatestResultRTT(pctResult);
	return latestResult < 240;
};

const RoundTripTime = ({pctResult = {}}) => (
	<div className="row mt-1">
		<div className="col-md-12">
			<div className="row">
				<div className="col-md-8">
					<span className={styles.resultText}>
						<img src={isOK(pctResult) ? tickGreenIcon : dangerIcon}/>
						<span className="ml-1">Round trip time</span>
					</span>
				</div>
				<div className="col-md-4 text-right">
					<span className={styles.resultValue}>
						{parseFloat(getLatestResultRTT(pctResult)).toFixed(2)} ms </span>
				</div>
			</div>
		</div>
	</div>
);

RoundTripTime.propTypes = {
	pctResult: PropTypes.array,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RoundTripTime);

