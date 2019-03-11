import React from "react";
import PropTypes from "prop-types";
import lo from "lodash";

import starYellowIcon from '../../res/images/star-yellow.svg';
import starWhiteIcon from '../../res/images/star-white.svg';

import {feedbackRatings, feedbackRatingsText} from '../../utils/feedback'

const FeedbackRatings = ({onFeedbackRatingChange, feedbackRating}) => (
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
					   onClick={() => onFeedbackRatingChange(currentFeedback)}>
						<img src={currentFeedback <= feedbackRating ? starYellowIcon : starWhiteIcon}/>
					</a>
				))
			}
		</div>
		<div className="col-md-12" style={{
			fontFamily: 'AmazonEmber',
			fontSize: '12px',
			letterSpacing: 'normal',
			color: '#000000'
		}}>{lo.get(feedbackRatingsText, feedbackRating - 1)}
		</div>
	</div>
);

FeedbackRatings.propTypes = {
	onFeedbackRatingChange: PropTypes.func.isRequired,
	feedbackRating: PropTypes.number.isRequired,
};

export default FeedbackRatings;