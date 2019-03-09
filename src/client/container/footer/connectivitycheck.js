import React, {Component} from "react";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import {onRequestReportCallIssue} from "../../reducers/acReducer";
import ReportACall from "./components/reportcall";
import Info from "./components/info";

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
					<ReportACall
						divClass={'col-md-6 p-0 text-left'}
						linkClass={'btn'}
						style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}
						onClickHandler={this.props.requestReportACallIssue}/>

					<Info divClass={'col-md-6 text-right'}
						  linkClass={'btn'}
						  style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}
						  onClickHandler={() => true}/>
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
