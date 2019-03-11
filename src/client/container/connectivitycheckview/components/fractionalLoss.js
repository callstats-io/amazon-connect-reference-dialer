import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";


import tickGreenIcon from '../../../res/images/fa-tick-green.svg';
import dangerIcon from '../../../res/images/fa-danger.svg';

import lo from 'lodash';


const getLatestResultFractionalLoss = (pctResult) => {
	let lastRecord = lo.last(pctResult) || {};
	return lastRecord.fractionalLoss || 0;
};

const isOK = (pctResult) => {
	let latestResult = getLatestResultFractionalLoss(pctResult);
	return latestResult < 0.05;
};

const FractionalLoss = ({pctResult = {}}) => (
	<div className="row mt-1">
		<div className="col-md-12">
			<div className="row">
				<div className="col-md-8">
					<span style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber'}}>
						<img src={isOK(pctResult) ? tickGreenIcon : dangerIcon}/>
					<a className="ml-1">Packet loss</a></span>
				</div>
				<div className="col-md-4 text-right">
					<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
						{parseFloat(getLatestResultFractionalLoss(pctResult)).toFixed(3)} % </a>
				</div>
			</div>
		</div>
	</div>
);

FractionalLoss.propTypes = {
	pctResult: PropTypes.array,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FractionalLoss);

