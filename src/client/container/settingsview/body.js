import React, {Component} from "react";
import {connect} from "react-redux";


class Body extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`card-body`}
				 style={{paddingLeft: '0.95em', paddingRight: '0.95em', paddingTop: '0'}}>
				<div className="row" style="background-color: #3885de;">
				</div>
			</div>
		);
	}
}

Body.propTypes = {};
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Body);
