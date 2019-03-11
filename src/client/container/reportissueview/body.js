import React from "react";
import PropTypes from "prop-types";

import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';

import IssueNotes from './issueNotes';
import FeedbackRatings from './feedbackRatings';
import PredefinedIssues from './predefinedIssues';


const selectedIssueCount = (issueList) => {
	let totalCount = 0;
	for (let i = 0; i < issueList.length; i += 1) {
		let currentIssue = issueList[i].items;
		for (let j = 0; j < currentIssue.length; j += 1) {
			let currentItem = currentIssue[j];
			if (currentItem.marked) {
				totalCount += 1;
			}
		}
	}
	return totalCount;
};

const BodyHeader = ({closeReportCallIssue}) => (
	<div className="row ">
		<div className="col-md-10">
			<p style={{color: '#000000', fontSize: '18px', fontFamily: 'AmazonEmber'}}>Report a
				call issue</p>
		</div>
		<div className="col-md-2"
			 onClick={closeReportCallIssue}>
			<img src={closeOrDismissIcon} style={{cursor: 'pointer'}}/></div>
	</div>
);
BodyHeader.propTypes = {
	closeReportCallIssue: PropTypes.func.isRequired,
};


const Body = ({closeReportCallIssue, onFeedbackTextChange, onFeedbackRatingChange, onIssueListSelectionChange, feedbackRatings, feedbackText, issueList}) => (
	<div className="card-body" style={{backgroundColor: '#ffffff'}}>

		<BodyHeader closeReportCallIssue={closeReportCallIssue}/>

		<FeedbackRatings onFeedbackRatingChange={onFeedbackRatingChange}
						 feedbackRating={feedbackRatings}/>

		<IssueNotes onFeedbackTextChange={onFeedbackTextChange}
					feedbackText={feedbackText}/>

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
			}}>{selectedIssueCount(issueList)} selected
			</div>
		</div>
		<PredefinedIssues onIssueListSelectionChange={onIssueListSelectionChange}
						  issueList={issueList}/>

	</div>
);

Body.propTypes = {
	closeReportCallIssue: PropTypes.func.isRequired,
	onFeedbackTextChange: PropTypes.func.isRequired,
	onFeedbackRatingChange: PropTypes.func.isRequired,
	onIssueListSelectionChange: PropTypes.func.isRequired,
	feedbackRatings: PropTypes.number.isRequired,
	feedbackText: PropTypes.string.isRequired,
	issueList: PropTypes.array.isRequired,
};
export default Body;
