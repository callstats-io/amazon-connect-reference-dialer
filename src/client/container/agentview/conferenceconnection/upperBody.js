import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class UpperBody extends Component {
	constructor(props) {
		super(props);

	}

	render() {

		return (
			<div className={`row`}
				 style={{height: '182px', paddingTop: '5%'}}>

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
