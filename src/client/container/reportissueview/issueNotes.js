import React from "react";
import PropTypes from "prop-types";


const IssueNotes = ({onFeedbackTextChange, feedbackText}) => (
	<div className="row mt-1">
		<div className="col-md-12">
							<textarea placeholder="Enter your notes about the issue here" rows={3}
									  value={feedbackText}
									  onChange={onFeedbackTextChange}
									  className="report-error-user-note col-md-12" style={{
								maxHeight: '55px',
								minHeight: '10px',
								backgroundColor: '#f7f7f7',
								resize: 'none',
								fontFamily: 'AmazonEmber',
								fontSize: '14px',
								color: '#000000'
							}}/>
		</div>
	</div>
);

IssueNotes.propTypes = {
	onFeedbackTextChange: PropTypes.func.isRequired,
	feedbackText: PropTypes.string,
};

export default IssueNotes;
