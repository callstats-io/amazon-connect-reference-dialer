import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";


import tickGreenIcon from '../../res/images/fa-tick-green.svg';
import dangerIcon from '../../res/images/fa-danger.svg';

import lo from 'lodash';


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
					<span style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber'}}>
						<img src={isOK(pctResult) ? tickGreenIcon : dangerIcon}/>
						<a className="ml-1">Round trip time</a>
					</span>
				</div>
				<div className="col-md-4 text-right">
					<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
						{parseFloat(getLatestResultRTT(pctResult)).toFixed(2)} ms </a>
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

