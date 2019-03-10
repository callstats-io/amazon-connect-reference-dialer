import React from "react";
import PropTypes from "prop-types";

import markFalseIcon from '../../res/images/fa-mark-false.svg';
import markTrueIcon from '../../res/images/fa-mark-true.svg';


const PredefinedIssues = ({onIssueListSelectionChange, issueList}) => (
	<div>
		<div className="row mt-1 ml-0 mr-0" style={{
			maxHeight: '117px',
			minHeight: '20%',
			border: 'solid 1px #cfcfcf',
			backgroundColor: '#f7f7f7',
			overflowY: 'scroll'
		}}>
			<div className="col-md-12 mt-1" style={{}}>
				<div className="row">
					<div className="col-md-12">
						<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
							<img src={markFalseIcon}/> I need help, contact
							me</a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<a style={{
							opacity: '0.6',
							fontFamily: 'AmazonEmber',
							fontSize: '12px',
							letterSpacing: 'normal',
							color: '#000000'
						}}> Audio related problems </a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
							<img src={markTrueIcon}/> Customer can't
							hear agent</a>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
							<img src={markFalseIcon}/> No audio</a>
					</div>
				</div>
			</div>
		</div>
	</div>
);

PredefinedIssues.propTypes = {
	onIssueListSelectionChange: PropTypes.func.isRequired,
	issueList: PropTypes.object.isRequired,
};

export default PredefinedIssues;
