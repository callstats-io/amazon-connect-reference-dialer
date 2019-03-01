import React, {Component} from "react";
import {connect} from "react-redux";
import SVG from 'react-inlinesvg';

import infoIcon from '../../res/images/fa-info.svg';
import PropTypes from "prop-types";
import {onRequestReportCallIssue} from "../../reducers/acReducer";

class Footer extends Component {
	constructor(props) {
		super(props);
	}
	requestReportACallIssue() {
		this.props.requestReportACallIssue();
	}

	render() {
		return (
			<div className="card-footer" style={{backgroundColor: '#ffffff', borderTop: 0}}>
				<div className="row">
					<div className="col-md-6 p-0 text-left">
						<a className="btn" href="#"
						   onClick={() => this.requestReportACallIssue()}
						   style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}> Report a call
							issue </a>
					</div>
					<div className="col-md-6 text-right">
						<a className="btn" href="#"
						   style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}>
							<SVG src={infoIcon}/> Info </a>
					</div>
				</div>
			</div>
		);
	}
}

Footer.propTypes = {
	requestReportACallIssue: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
	requestReportACallIssue: () => {
		dispatch(onRequestReportCallIssue('pending'))
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);
