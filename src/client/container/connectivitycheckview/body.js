import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import closeIcon from '../../res/images/fa-close-or-dismiss.svg';
import rerunIcon from '../../res/images/fa-return.svg';


import {
	onRequestConnectivityCheck
} from "../../reducers/acReducer";

import csioHandler from "../../api/csioHandler";
import MediaConnectivity from "./mediaConnectivity";
import RoundTripTime from "./roundTripTime";
import FractionalLoss from "./fractionalLoss";
import Throughput from "./throughput";
import ThroughputMessage from "./throughputMessage";
import RTTGraph from "./rttgraph";
import databaseManager from "../../api/databaseManager";

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pctResult: databaseManager.getPrecallTestResult(),
			inProgress: false,
		};
		this.doPrecalTest = this.doPrecalTest.bind(this);
	}

	requestConnectivityCheck(phoneType) {
		this.props.requestConnectivityCheck();
	}

	closeSetting() {
		this.props.closeSetting();
	}

	doPrecalTest() {
		this.setState({
			inProgress: true,
		});
		csioHandler.doPrecallTest().then(result => {
			this.setState({
				inProgress: false,
				pctResult: result,
			});
		});
	}

	render() {
		return (
			<div className="card-body" style={{backgroundColor: '#ffffff'}}>
				<div className="row ">
					<div className="col-md-7 mr-0 pr-0">
						<p style={{color: '#000000', fontSize: '18px', fontFamily: 'AmazonEmber'}}
						   className="m-0 p-0">Connectivity check</p>
					</div>
					<div className="col-md-3 p-0 m-0">
						<a className={`btn text-left p-0 m-0 ${this.state.inProgress && 'disabled'}`} href="#"
						   onClick={this.doPrecalTest}
						   style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}>
							<img className="fa-dial-button" src={rerunIcon}/> Rerun </a>
					</div>
					<div className="col-md-2" style={{cursor: 'pointer'}}
						 onClick={() => this.closeSetting()}>
						<img className="p-0 m-0" src={closeIcon}/>
					</div>
				</div>
				<MediaConnectivity pctResult={this.state.pctResult}/>
				<RoundTripTime pctResult={this.state.pctResult}/>
				<FractionalLoss pctResult={this.state.pctResult}/>
				<Throughput pctResult={this.state.pctResult}/>
				<ThroughputMessage pctResult={this.state.pctResult}/>
				<RTTGraph pctResult={this.state.pctResult}/>
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
