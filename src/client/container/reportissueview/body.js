import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SVG from 'react-inlinesvg';

import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';
import circleMarkIcon from '../../res/images/fa-circle-mark.svg';
import circleUnmarkIcon from '../../res/images/fa-circle-unmark.svg';


import {
	onRequestReportCallIssue
} from "../../reducers/acReducer";

class Body extends Component {
	constructor(props) {
		super(props);
	}

	requestReportACallIssue(issueObject) {
		this.props.requestReportACallIssue();
	}

	closeSetting() {
		this.props.closeReportCallIssue();
	}

	render() {
		return (
			<div className="card-body" style={{backgroundColor: '#ffffff'}}>
				<div className="row ">
					<div className="col-md-10">
						<p style={{color: '#000000', fontSize: '18px', fontFamily: 'AmazonEmber'}}>Report a call
							issue</p>
					</div>
					<div className="col-md-2"
						 onClick={() => this.closeSetting('')}>
						<SVG src={closeOrDismissIcon} style={{cursor: 'pointer'}}/></div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<p style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber'}}>Phone
							type</p>
					</div>
				</div>
				<div className="row" style={{cursor: 'pointer'}}
					 onClick={() => this.onRequestReportCallIssue('softphone')}>
					<div className="col-md-2">
						<SVG src={circleMarkIcon}/></div>
					<div className="col-md-10">
						<p style={{
							color: '#000000',
							fontSize: '14px',
							fontFamily: 'AmazonEmber',
							marginTop: '1%'
						}}>Softphone</p>
					</div>
				</div>
				<div className="row" style={{cursor: 'pointer'}}
					 onClick={() => this.onRequestReportCallIssue('deskphone')}>
					<div className="col-md-2">
						<SVG src={circleUnmarkIcon}/></div>
					<div className="col-md-10">
						<p style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber', marginTop: '1%'}}>Desk
							phone</p>
					</div>
				</div>

			</div>
		);
	}
}

Body.propTypes = {
	closeReportCallIssue: PropTypes.func.isRequired,
	requestReportACallIssue: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	closeReportCallIssue: () => {
		dispatch(onRequestReportCallIssue('close'));
	},
	requestReportACallIssue: () => {
		dispatch(onRequestReportCallIssue('complete'))
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Body);
