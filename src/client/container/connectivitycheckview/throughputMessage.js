import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";


import tickGreenIcon from '../../res/images/fa-tick-green.svg';
import dangerIcon from '../../res/images/fa-danger.svg';

import lo from 'lodash';


const getLatestResultThroughput = (pctResult) => {
	let lastRecord = lo.last(pctResult) || {};
	return lastRecord.throughput || 0;
};

const isBad = (pctResult) => {
	let latestResult = getLatestResultThroughput(pctResult);
	return latestResult < 20;
};

const ThroughputMessage = ({pctResult = {}}) => (
	isBad(pctResult) && <div className="row mt-1">
		<div className="col-md-12">
			<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}> Check to
				see if you have other devices on the network consuming bandwidth. </a>
		</div>
	</div>
);

ThroughputMessage.propTypes = {
	pctResult: PropTypes.array,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ThroughputMessage);

