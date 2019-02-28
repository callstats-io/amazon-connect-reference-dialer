import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SVG from 'react-inlinesvg';

import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';
import starYellowIcon from '../../res/images/star-yellow.svg';
import starWhiteIcon from '../../res/images/star-white.svg';

import {
	onRequestReportCallIssue
} from "../../reducers/acReducer";

const feedbackRatings = [1, 2, 3, 4, 5];
const feedbackRatingsText = ['Poor', 'Poor', 'Ok', 'Good', 'Excellent'];
const defaultFeedback = 3;

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
		const feedback = defaultFeedback;
		return (
			<div className="card-body" style={{ backgroundColor: '#ffffff'}}>
				<div className="row ">
					<div className="col-md-10">
						<p style={{color: '#000000', fontSize: '18px', fontFamily: 'AmazonEmber'}}>Report a
							call issue</p>
					</div>
					<div className="col-md-2"><SVG src={closeOrDismissIcon} style={{cursor: 'pointer'}}/></div>
				</div>
				<div className="row mt-2">
					<div className="col-md-12">
						<a className="text-left"
						   style={{fontFamily: 'AmazonEmber', fontSize: '12px', color: '#000000'}}>How was the call
							quality? </a></div>
					<div className="col-md-12">
						{
							feedbackRatings.map((currentFeedback,) => (
								<a key={`feedback-rating-${currentFeedback}`}
								   style={{cursor: 'pointer'}}>
									<SVG src={currentFeedback <= feedback ? starYellowIcon : starWhiteIcon}/>
								</a>
							))
						}
					</div>
					<div className="col-md-12" style={{
						fontFamily: 'AmazonEmber',
						fontSize: '12px',
						letterSpacing: 'normal',
						color: '#000000'
					}}>Good
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
