import React from "react";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import {onRequestReportCallIssue} from "../../reducers/acReducer";
import ReportACall from "../footer/components/reportcall";
import Info from "../footer/components/info";

const Footer = ({requestReportACallIssue}) => (
	<div className="card-footer" style={{backgroundColor: '#ffffff', borderTop: 0}}>
		<div className="row">
			<ReportACall
				divClass={'col-md-6 p-0 text-left'}
				linkClass={'btn'}
				style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}
				onClickHandler={requestReportACallIssue}/>

			<Info divClass={'col-md-6 text-right'}
				  linkClass={'btn disabled'}
				  style={{color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'}}
				/*dummy click handler to pass info props required field*/
				  onClickHandler={() => true}/>
		</div>
	</div>
);

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
