class FeedbackHandler {
  constructor () {
    this.feedbackRatings = 0;
  }

  showFeedbackReports () {
    return this.feedbackRatings >= 1 && this.feedbackRatings <= 3;
  }

  updateFeedback (feedbackRatings = 0) {
    this.feedbackRatings = feedbackRatings;
    return this.feedbackRatings;
  }

  getFeedbackRatings () {
    return this.feedbackRatings;
  }
}

const feedbackHandler = new FeedbackHandler();
export default feedbackHandler;
