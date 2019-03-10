import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {
	onRequestConnectivityCheck,
	onRequestReportCallIssue
} from "../../reducers/acReducer";


import ReportACall from "./components/reportcall";
import DownloadLogs from "./components/downloadlogs";
import ConnectivityCheck from "./components/connectivitycheck";
import Language from "./components/language";


import acManager from './../../api/acManager';

const FooterStyle = {
	reportCall: {
		divClass: 'col-md-6 p-0',
		linkClass: 'btn align-self-left text-left',
		style: {color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'},
	},
	downloadLogs: {
		divClass: 'col-md-6 p-0',
		linkClass: 'btn text-left',
		style: {color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'},
	},
	connectivityCheck: {
		divClass: 'col-md-6 p-0',
		linkClass: 'btn text-left',
		style: {color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'},
	},
	language: {
		divClass: 'col-md-6 p-0',
		linkClass: 'btn text-left disabled',
		style: {color: '#3885de', fontFamily: 'AmazonEmber', fontSize: '14px'},
	},
};

const Footer = ({requestReportACallIssue, requestConnectivityCheck}) => (
	<div className="card-footer" style={{backgroundColor: '#ffffff', borderTop: 0}}>
		<div className="row">
			<ReportACall divClass={FooterStyle.reportCall.divClass}
						 linkClass={FooterStyle.reportCall.linkClass}
						 style={FooterStyle.reportCall.style}
						 onClickHandler={requestReportACallIssue}/>

			<DownloadLogs divClass={FooterStyle.downloadLogs.divClass}
						  linkClass={FooterStyle.downloadLogs.linkClass}
						  style={FooterStyle.downloadLogs.style}
						  onClickHandler={acManager.downloadACLog}/>

			<ConnectivityCheck divClass={FooterStyle.connectivityCheck.divClass}
							   linkClass={FooterStyle.connectivityCheck.linkClass}
							   style={FooterStyle.connectivityCheck.style}
							   onClickHandler={requestConnectivityCheck}/>

			<Language divClass={FooterStyle.language.divClass}
					  linkClass={FooterStyle.language.linkClass}
					  style={FooterStyle.language.style}
					  onClickHandler={() => true}/>
		</div>
	</div>
);

Footer.propTypes = {
	requestReportACallIssue: PropTypes.func.isRequired,
	requestConnectivityCheck: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
	requestReportACallIssue: () => {
		dispatch(onRequestReportCallIssue('pending'))
	},
	requestConnectivityCheck: () => {
		dispatch(onRequestConnectivityCheck('pending'))
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Footer);
