import React from "react";
import PropTypes from "prop-types";

import styles from './reportissue.css';

const IssueNotes = ({onFeedbackTextChange, feedbackText}) => (
	<div className="row mt-1">
		<div className="col-md-12">
			<textarea placeholder="Enter your notes about the issue here" rows={3}
					  value={feedbackText}
					  onChange={onFeedbackTextChange}
					  className={`col-md-12 ${styles.textArea}`}/>
		</div>
	</div>
);

IssueNotes.propTypes = {
	onFeedbackTextChange: PropTypes.func.isRequired,
	feedbackText: PropTypes.string,
};

export default IssueNotes;
