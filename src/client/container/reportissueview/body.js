import React from 'react';
import PropTypes from 'prop-types';

import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';

import IssueNotes from './issueNotes';
import FeedbackRatings from './feedbackRatings';
import PredefinedIssues from './predefinedIssues';
import styles from './reportissue.css';

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

const BodyHeader = ({ closeReportCallIssue }) => (
  <div className="row ">
    <div className="col-10">
      <span className={styles.cardBodyHeader}>Report a
				call issue</span>
    </div>
    <div className="col-2"
			 onClick={closeReportCallIssue}>
      <img src={closeOrDismissIcon} className={styles.cursor}/></div>
  </div>
);
BodyHeader.propTypes = {
  closeReportCallIssue: PropTypes.func.isRequired
};

const Body = ({ closeReportCallIssue, onFeedbackTextChange, onFeedbackRatingChange, onIssueListSelectionChange, feedbackRatings, feedbackText, issueList }) => (
  <div className={`card-body ${styles.cardBodyMain}`}>

    <BodyHeader closeReportCallIssue={closeReportCallIssue}/>

    <FeedbackRatings onFeedbackRatingChange={onFeedbackRatingChange}
						 feedbackRating={feedbackRatings}/>

    <IssueNotes onFeedbackTextChange={onFeedbackTextChange}
      feedbackText={feedbackText}/>

    <div className="row">
      <div className={`col-7 text-left ${styles.bodySelectAReason}`}>Select a reason
      </div>
      <div className={`col-5 text-right ${styles.bodyIssueSelect}`}>{selectedIssueCount(issueList)} selected
      </div>
    </div>
    <div className={`row`}>
      <PredefinedIssues onIssueListSelectionChange={onIssueListSelectionChange}
							  issueList={issueList}/>
    </div>
  </div>
);

Body.propTypes = {
  closeReportCallIssue: PropTypes.func.isRequired,
  onFeedbackTextChange: PropTypes.func.isRequired,
  onFeedbackRatingChange: PropTypes.func.isRequired,
  onIssueListSelectionChange: PropTypes.func.isRequired,
  feedbackRatings: PropTypes.number.isRequired,
  feedbackText: PropTypes.string.isRequired,
  issueList: PropTypes.array.isRequired
};
export default Body;
