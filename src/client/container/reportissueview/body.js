import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SVG from 'react-inlinesvg';
import lo from 'lodash';

import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';
import starYellowIcon from '../../res/images/star-yellow.svg';
import starWhiteIcon from '../../res/images/star-white.svg';
import markFalseIcon from '../../res/images/fa-mark-false.svg';
import markTrueIcon from '../../res/images/fa-mark-true.svg';

import {
	onFeedbackChange,
	onRequestReportCallIssue
} from "../../reducers/acReducer";

const feedbackRatings = [1, 2, 3, 4, 5];
const feedbackRatingsText = ['Poor', 'Poor', 'Ok', 'Good', 'Excellent'];
const defaultFeedback = 3;

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feedback: props.feedback,
		};
	}

	feedbackChange(currentFeedback) {
		this.setState({
			feedback: currentFeedback
		});
	}

	requestReportACallIssue(issueObject) {
		this.props.requestReportACallIssue();
	}

	closeReportCallIssue() {
		this.props.closeReportCallIssue();
	}

	render() {
		return (
			<div className="card-body" style={{backgroundColor: '#ffffff'}}>
				<div className="row ">
					<div className="col-md-10">
						<p style={{color: '#000000', fontSize: '18px', fontFamily: 'AmazonEmber'}}>Report a
							call issue</p>
					</div>
					<div className="col-md-2"
						 onClick={() => this.closeReportCallIssue()}>
						<SVG src={closeOrDismissIcon} style={{cursor: 'pointer'}}/></div>
				</div>
				<div className="row mt-0">
					<div className="col-md-12">
						<a className="text-left"
						   style={{fontFamily: 'AmazonEmber', fontSize: '12px', color: '#000000'}}>How was the call
							quality? </a></div>
					<div className="col-md-12">
						{
							feedbackRatings.map((currentFeedback,) => (
								<a key={`feedback-rating-${currentFeedback}`}
								   style={{cursor: 'pointer'}}
								   onClick={() => this.feedbackChange(currentFeedback)}>
									<SVG src={currentFeedback <= this.state.feedback ? starYellowIcon : starWhiteIcon}/>
								</a>
							))
						}
					</div>
					<div className="col-md-12" style={{
						fontFamily: 'AmazonEmber',
						fontSize: '12px',
						letterSpacing: 'normal',
						color: '#000000'
					}}>{lo.get(feedbackRatingsText, this.state.feedback - 1)}
					</div>
				</div>
				<div className="row">
					<div className="col-md-7 text-left" style={{
						opacity: '0.6',
						fontFamily: 'AmazonEmber',
						fontSize: '12px',
						letterSpacing: 'normal',
						color: '#000000'
					}}>Select a reason
					</div>
					<div className="col-md-5 text-right" style={{
						opacity: '0.6',
						fontFamily: 'AmazonEmber',
						fontSize: '12px',
						letterSpacing: 'normal',
						color: '#000000'
					}}>3 selected
					</div>
				</div>

				<div>
					<div className="row mt-1 ml-0 mr-0" style={{
						maxHeight: '117px',
						minHeight: '20%',
						border: 'solid 1px #cfcfcf',
						backgroundColor: '#f7f7f7',
						overflowY: 'scroll'
					}}>
						<div className="col-md-12 mt-1" style={{}}>
							<div className="row">
								<div className="col-md-12">
									<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
										<SVG src={markFalseIcon}/> I need help, contact
										me</a>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<a style={{
										opacity: '0.6',
										fontFamily: 'AmazonEmber',
										fontSize: '12px',
										letterSpacing: 'normal',
										color: '#000000'
									}}> Audio related problems </a>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
										<SVG src={markTrueIcon}/> Customer can't
										hear agent</a>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
										<SVG src={markFalseIcon}/> No audio</a>
								</div>
							</div>
						</div>
					</div>
					<div className="row mt-3">
						<div className="col-md-12">
							<textarea placeholder="Enter your notes about the issue here" rows={3}
									  className="report-error-user-note col-md-12" style={{
								maxHeight: '55px',
								minHeight: '10px',
								backgroundColor: '#f7f7f7',
								resize: 'none',
								fontFamily: 'AmazonEmber',
								fontSize: '14px',
								color: '#000000'
							}} defaultValue={""}/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Body.propTypes = {
	feedback: PropTypes.number.isRequired,
	closeReportCallIssue: PropTypes.func.isRequired,
	requestReportACallIssue: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	feedback: state.acReducer.feedback || defaultFeedback,
});

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
