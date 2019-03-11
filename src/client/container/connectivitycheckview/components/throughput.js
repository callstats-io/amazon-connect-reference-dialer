import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";


import tickGreenIcon from '../../../res/images/fa-tick-green.svg';
import dangerIcon from '../../../res/images/fa-danger.svg';

import lo from 'lodash';


const getLatestResultThroughput = (pctResult) => {
	let lastRecord = lo.last(pctResult) || {};
	return lastRecord.throughput || 0;
};

const isOK = (pctResult) => {
	let latestResult = getLatestResultThroughput(pctResult);
	return latestResult > 20;
};

const Throughput = ({pctResult = {}}) => (
	<div className="row mt-1">
		<div className="col-md-12">
			<div className="row">
				<div className="col-md-8">
								<span style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber'}}>
									<img src={isOK(pctResult) ? tickGreenIcon : dangerIcon}/>
									<a className="ml-1">Average throughput</a></span>
				</div>
				<div className="col-md-4 text-right p-0 m-0">
					<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
						{parseFloat(getLatestResultThroughput(pctResult)).toFixed(2)} kbps </a>
				</div>
			</div>
		</div>
	</div>
);

Throughput.propTypes = {
	pctResult: PropTypes.array,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Throughput);

