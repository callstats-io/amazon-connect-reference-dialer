import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from '../header/index';
import Body from './body';
import Footer from './footer';
import issueList from "./issues";
import {onRequestReportCallIssue} from "../../reducers/acReducer";
import {defaultFeedback} from './../../utils/feedback'

import sessionManager from './../../api/sessionManager';
import feedbackHandler from './../../api/feedbackHandler';

import styles from './reportissue.css';
import csioHandler from "../../api/csioHandler";

class ReportCallIssueView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedbackRatings: feedbackHandler.getFeedbackRatings(),
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
        const feedback = feedbackHandler.updateFeedback(currentFeedback);
        this.setState({
            feedbackRatings: feedback
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
        sessionManager.setAgentAvailable();

        feedbackHandler.updateFeedback(0);
        let {feedbackRatings, feedbackText, issueList} = this.state;
        csioHandler.sendFeedback({feedbackRatings, feedbackText, issueList});
        this.closeReportCallIssue();
    }

    closeReportCallIssue() {
        this.props.closeReportCallIssue();
    }

    render() {
        return (
            <div className={`row h-100`}>
                <div className={`col-md-12 ${styles.zeroPadding}`}>
                    <div className={`card h-100 ${styles.cardBody}`}>
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
)(ReportCallIssueView);
