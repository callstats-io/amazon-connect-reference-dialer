import React, {Component} from "react";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';
import lo from 'lodash';

import starYellowIcon from '../../res/images/star-yellow.svg';
import starWhiteIcon from '../../res/images/star-white.svg';
import PropTypes from "prop-types";
import {
	onFeedbackChange
} from "../../reducers/acReducer";


const feedbackRatings = [1, 2, 3, 4, 5];
const feedbackRatingsText = ['Poor', 'Poor', 'Ok', 'Good', 'Excellent'];
const defaultFeedback = 3;

class QuickFeedback extends Component {
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

	render() {
		const feedback = this.props.feedback;
		return (
			<div className="row mt-3">
				<div className="col-md-7">
					<a className="text-left"
					   style={{opacity: '0.6', fontFamily: 'AmazonEmber', fontSize: '12px', color: '#000000'}}>How was
						the call quality?
					</a></div>
				<a className="text-left"
				   style={{opacity: '0.6', fontFamily: 'AmazonEmber', fontSize: '12px', color: '#000000'}}>
				</a>
				<div className="col-md-5"><a className="text-left" style={{
					opacity: '0.6',
					fontFamily: 'AmazonEmber',
					fontSize: '12px',
					color: '#000000'
				}}>
				</a><a className="text-left" style={{fontFamily: 'AmazonEmber', fontSize: '12px', color: '#3885de'}}
					   href="#">Report a call issue</a>
				</div>
				<div className="col-md-12 mt-1">
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
	feedback: PropTypes.number.isRequired,
};
const mapStateToProps = state => ({
	feedback: state.acReducer.feedback || defaultFeedback,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuickFeedback);
