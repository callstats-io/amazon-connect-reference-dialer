import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import PrimaryConnection from './primaryconnection';
import ThirdPartyConnection from './thirdPartyConnection';

class UpperBody extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		const {currentState} = this.props;
		return (
			<div className={`row`}
				 style={{height: '182px'}}>
				<PrimaryConnection currentState={currentState}/>
				<ThirdPartyConnection currentState={currentState}/>
			</div>
		);
	}
}

UpperBody.propTypes = {
	currentState: PropTypes.object,
};
const mapStateToProps = state => ({
	currentState: state.acReducer.currentState,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UpperBody);
