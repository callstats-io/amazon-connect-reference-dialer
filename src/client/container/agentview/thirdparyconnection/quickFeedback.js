import React, {Component} from "react";
import {connect} from "react-redux";
import lo from 'lodash';


import starYellowIcon from '../../../res/images/star-yellow.svg';
import starWhiteIcon from '../../../res/images/star-white.svg';
import PropTypes from "prop-types";
import ConfirmReport from './../../popups/confirmreport/confirmreport';
import feedbackHandler from './../../../api/feedbackHandler';

import {
	onRequestReportCallIssue
} from "../../../reducers/acReducer";

import {
	feedbackRatings,
	feedbackRatingsText,
	defaultFeedback
} from '../../../utils/feedback'
import sessionManager from "../../../api/sessionManager";

class QuickFeedback extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feedback: defaultFeedback,
		};
		this.requestReportACallIssue = this.requestReportACallIssue.bind(this);
		this.closeReport = this.closeReport.bind(this);
		this.skipReport = this.skipReport.bind(this);
	}

	closeReport() {
		jQuery("#confirmReportIssue").modal('hide');
	}

	skipReport() {
		this.closeReport();
		feedbackHandler.updateFeedback(0);
		sessionManager.setAgentAvailable();
	}
	requestReportACallIssue() {
		this.closeReport();
		feedbackHandler.updateFeedback(0);
		this.props.requestReportACallIssue();
	}

	feedbackChange(currentFeedback) {
		const feedback = feedbackHandler.updateFeedback(currentFeedback);
		this.setState({
			feedback: feedback,
		});
	}

	render() {
		return (
			<div className="row mt-3">
				<ConfirmReport requestReportACallIssue={this.requestReportACallIssue}
							   closeReport={this.closeReport}
							   skipReport={this.skipReport}/>

				<div className="col-md-7 pr-0 mr-0">
					<a className="text-left"
					   style={{
						   cursor: 'pointer',
						   opacity: '0.6',
						   fontFamily: 'AmazonEmber',
						   fontSize: '14px',
						   color: '#000000'
					   }}>How was
						the call quality?
					</a></div>
				<div className="col-md-5 pl-0 ml-0">
					<a className="text-left"
					   style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#3885de', cursor: 'pointer'}}
					   onClick={this.props.requestReportACallIssue}
					>Report a call issue</a>
				</div>
				<div className="col-md-12 mt-1">
					{
						feedbackRatings.map((currentFeedback,) => (
							<a key={`feedback-rating-${currentFeedback}`}
							   style={{cursor: 'pointer', paddingRight: '2%'}}
							   onClick={() => this.feedbackChange(currentFeedback)}>
								<img src={currentFeedback <= this.state.feedback ? starYellowIcon : starWhiteIcon}/>
							</a>
						))
					}
				</div>
				<div className="col-md-12 mt-1" style={{
					opacity: '0.6',
					fontFamily: 'AmazonEmber',
					fontSize: '12px',
					letterSpacing: 'normal',
					color: '#000000'
				}}>{lo.get(feedbackRatingsText, this.state.feedback - 1)}
				</div>
			</div>
		);
	}
}

QuickFeedback.propTypes = {
	feedback: PropTypes.number,
	requestReportACallIssue: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	requestReportACallIssue: () => {
		dispatch(onRequestReportCallIssue('pending'))
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuickFeedback);
