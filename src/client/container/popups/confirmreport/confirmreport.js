import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import closeBtn from './../../../res/images/fa-close-or-dismiss.svg';
import styles from './confirmreport.css';

import {onRequestConnectivityCheck} from "../../../reducers/acReducer";

const ConfirmReport = ({}) => (
	<div className={`col-md-12`}>
		<div className={'row'}>
			<div className={`col-md-12 ${styles.reportBox}`}>
				<div className="row mt-2">
					<div className="col-md-10">
						<span className={styles.reportText}>Would you like to report a call issue?</span>
					</div>
					<div className="col-md-2 text-right">
						<img className="p-0 m-0" src={closeBtn}/>
					</div>
				</div>
				<div className="row mt-1">
					<div className="col-md-10">
						<span className={styles.issueReportText}>We encourage to report if you have a quality issues during the call. </span>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-md-6">
					</div>
					<div className={`col-md-3 text-right ${styles.skip}`}> SKIP
					</div>
					<div className={`col-md-3 text-right ${styles.report}`}> Report
					</div>
				</div>
			</div>
		</div>
	</div>
);


ConfirmReport.propTypes = {};


const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
	requestConnectivityCheck: () => {
		dispatch(onRequestConnectivityCheck('pending'))
	},
});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConfirmReport);
