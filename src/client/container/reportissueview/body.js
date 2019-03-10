import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';

import {
	onRequestReportCallIssue
} from "../../reducers/acReducer";

const defaultFeedback = 3;
import issueList from './issues';
import IssueNotes from './issueNotes';
import FeedbackRatings from './feedbackRatings';
import PredefinedIssues from './predefinedIssues';

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {
			feedbackRatings: defaultFeedback,
			feedbackText: '',
			issueList: issueList
		};
		this.onFeedbackTextChange = this.onFeedbackTextChange.bind(this);
		this.onFeedbackRatingChange = this.onFeedbackRatingChange.bind(this);
		this.onIssueListSelectionChange = this.onIssueListSelectionChange.bind(this);
	}

	onFeedbackTextChange(event) {
		this.setState({
			feedbackText: event.target.value
		});
	}

	onFeedbackRatingChange(currentFeedback) {
		this.setState({
			feedbackRatings: currentFeedback
		});
	}

	onIssueListSelectionChange(issueList) {
		this.setState({
			issueList: issueList,
		});
	}

	submitIssue() {
		this.closeReportCallIssue();
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
						<img src={closeOrDismissIcon} style={{cursor: 'pointer'}}/></div>
				</div>
				<FeedbackRatings onFeedbackRatingChange={this.onFeedbackRatingChange}
								 feedbackRating={this.state.feedbackRatings}/>

				<IssueNotes onFeedbackTextChange={this.onFeedbackTextChange}
							feedbackText={this.state.feedbackText}/>

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
				<PredefinedIssues onIssueListSelectionChange={this.onIssueListSelectionChange} issueList={this.state.issueList}/>

			</div>
		);
	}
}

Body.propTypes = {
	closeReportCallIssue: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	closeReportCallIssue: () => {
		dispatch(onRequestReportCallIssue('close'));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Body);
