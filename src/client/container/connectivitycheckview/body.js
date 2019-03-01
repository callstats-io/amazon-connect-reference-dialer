import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SVG from 'react-inlinesvg';
import acManager from './../../api/acManager';

import closeIcon from '../../res/images/fa-close-or-dismiss.svg';
import tickGreenIcon from '../../res/images/fa-tick-green.svg';
import rerunIcon from '../../res/images/fa-return.svg';
import dangerIcon from '../../res/images/fa-danger.svg';


import {
	onRequestConnectivityCheck
} from "../../reducers/acReducer";

import {Line} from 'react-chartjs-2';

class Body extends Component {
	constructor(props) {
		super(props);
	}

	requestConnectivityCheck(phoneType) {
		this.props.requestConnectivityCheck();
	}

	closeSetting() {
		this.props.closeSetting();
	}

	render() {
		const lastPCTRecord = acManager.getLastPCTRecord() || {};
		const rttRecords = acManager.getRTTRecords() || [];
		const chartOptions = {};
		const chartData = {
			labels: rttRecords.map((item) => {
				return '';
			}),
			datasets: [{
				label: 'RTT timeline',
				backgroundColor: '#ffffff',
				borderColor: 'rgba(255,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,99,132,0.4)',
				hoverBorderColor: 'rgba(255,99,132,1)',
				data: rttRecords.map((item) => {
					return item.rtt;
				}),
			}]
		};
		return (
			<div className="card-body" style={{backgroundColor: '#ffffff'}}>
				<div className="row ">
					<div className="col-md-7 mr-0 pr-0">
						<p style={{color: '#000000', fontSize: '18px', fontFamily: 'AmazonEmber'}}
						   className="m-0 p-0">Connectivity check</p>
					</div>
					<div className="col-md-3 p-0 m-0">
						<span className="btn text-left p-0 m-0" href="#"
							  style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}>
							<SVG class="fa-dial-button" src={rerunIcon}/> Rerun </span>
					</div>
					<div className="col-md-2" style={{cursor: 'pointer'}}
						 onClick={() => this.closeSetting()}>
						<SVG class="p-0 m-0" src={closeIcon}/>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-8">
								<span style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber'}}>
									{lastPCTRecord.mediaConnectivity && <SVG src={tickGreenIcon}/>}
									{!lastPCTRecord.mediaConnectivity && <SVG src={dangerIcon}/>}
									<a className="ml-1">Media
									connectivity</a></span>
							</div>
							<div className="col-md-4"/>
						</div>
					</div>
				</div>
				<div className="row mt-1">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-8">
								<span style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber'}}>
									<SVG src={tickGreenIcon}/> <a className="ml-1">Round trip time</a></span>
							</div>
							<div className="col-md-4 text-right">
								<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
									{parseFloat(lastPCTRecord.rtt || 0).toFixed(2)} ms </a>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-1">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-8">
								<span style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber'}}>
									<SVG src={tickGreenIcon}/> <a className="ml-1">Packet loss</a></span>
							</div>
							<div className="col-md-4 text-right">
								<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}
								> {parseFloat(lastPCTRecord.fractionalLoss || 0).toFixed(2)} </a>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-1">
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-8">
								<span style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber'}}>
									<SVG src={tickGreenIcon}/> <a className="ml-1">Average throughput</a></span>
							</div>
							<div className="col-md-4 text-right">
								<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
									{Math.round(lastPCTRecord.throughput || 0)} kbps </a>
							</div>
						</div>
					</div>
				</div>
				<div className="row mt-1">
					<div className="col-md-12">
						<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}> Check to
							see if you have other devices on the network consuming bandwidth. </a>
					</div>
				</div>
				<div className="row mt-1">
					<div className="col-md-12" style={{height: '90px'}}>
						<Line data={chartData}/>
					</div>
				</div>
			</div>
		);
	}
}

Body.propTypes = {
	closeSetting: PropTypes.func.isRequired,
	requestConnectivityCheck: PropTypes.func.isRequired,
	rttRecords: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
	rttRecords: state.acReducer.rttRecords || [{rtt: 1, itr: 1}],
});

const mapDispatchToProps = dispatch => ({
	closeSetting: () => {
		dispatch(onRequestConnectivityCheck('close'));
	},
	requestConnectivityCheck: () => {
		dispatch(onRequestConnectivityCheck('complete'))
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Body);
