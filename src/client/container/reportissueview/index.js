import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from '../header/index';
import Body from './body';
import Footer from './footer';
import issueList from "./issues";
import {onRequestReportCallIssue} from "../../reducers/acReducer";

const defaultFeedback = 3;

class ReportCallIssueView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			feedbackRatings: defaultFeedback,
			feedbackText: '',
			issueList: [...issueList],
		};
		this.onFeedbackTextChange = this.onFeedbackTextChange.bind(this);
		this.onFeedbackRatingChange = this.onFeedbackRatingChange.bind(this);
		this.onIssueListSelectionChange = this.onIssueListSelectionChange.bind(this);
		this.closeReportCallIssue = this.closeReportCallIssue.bind(this);
		this.submitIssue = this.submitIssue.bind(this);
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

	onIssueListSelectionChange(issueIndex, itemIndex) {
		let issueList = [...this.state.issueList];
		let currentItem = issueList[issueIndex].items[itemIndex];
		currentItem.marked = !currentItem.marked;

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
		const initialized = this.props.initialized;
		return (
			initialized &&
			<div className={`row h-100`}>
				<div className={`col-md-12`} style={{padding: '0'}}>
					<div className={`card h-100`} style={{backgroundColor: '#f2f2f2'}}>
						<Header/>
						<Body
							feedbackRatings={this.state.feedbackRatings}
							feedbackText={this.state.feedbackText}
							issueList={this.state.issueList}
							onFeedbackTextChange={this.onFeedbackTextChange}
							onFeedbackRatingChange={this.onFeedbackRatingChange}
							onIssueListSelectionChange={this.onIssueListSelectionChange}
							closeReportCallIssue={this.closeReportCallIssue}
						/>
						<Footer submitIssue={this.submitIssue}/>
					</div>
				</div>
			</div>

		);
	}
}

ReportCallIssueView.propTypes = {
	initialized: PropTypes.bool.isRequired,
	closeReportCallIssue: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	initialized: state.acReducer.initialized,
});
const mapDispatchToProps = dispatch => ({
	closeReportCallIssue: () => {
		dispatch(onRequestReportCallIssue('close'));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReportCallIssueView);
