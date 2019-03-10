import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";


import tickGreenIcon from '../../res/images/fa-tick-green.svg';
import dangerIcon from '../../res/images/fa-danger.svg';

import lo from 'lodash';

const isOK = (pctResult) => {
	let latestResult = lo.last(pctResult);
	console.warn('media connectivity ', latestResult);
	return latestResult && latestResult.mediaConnectivity === true;
};

const MediaConnectivity = ({pctResult = {}}) => (
	<div className="row mt-3">
		<div className="col-md-12">
			<div className="row">
				<div className="col-md-8">
								<span style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber'}}>
									{<img src={isOK(pctResult) ? tickGreenIcon : dangerIcon}/>}
									<a className="ml-1">Media connectivity</a></span>
				</div>
				<div className="col-md-4"/>
			</div>
		</div>
	</div>
);

MediaConnectivity.propTypes = {
	pctResult: PropTypes.array,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MediaConnectivity);
