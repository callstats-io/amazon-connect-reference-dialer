import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from '../header/index';
import Body from './body';

class DialPadView extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={`row h-100`}>
				<div className={`col-md-12`} style={{padding: '0'}}>
					<div className={`card h-100`} style={{backgroundColor: '#f2f2f2'}}>
						<Header/>
						<Body/>
					</div>
				</div>
			</div>

		);
	}
}

DialPadView.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DialPadView);
