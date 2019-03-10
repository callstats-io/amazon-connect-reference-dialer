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
				{
					issueList.map((issue, issueIndex) => (
						<div className="row" key={`issue-${issue.name}`}>
							<div className="col-md-12">
								<a style={{
									opacity: '0.6',
									fontFamily: 'AmazonEmber',
									fontSize: '12px',
									letterSpacing: 'normal',
									color: '#000000'
								}}> {issue.name} </a>
							</div>
							{
								issue.items.map((item, itemIndex) => (
									<div className="col-md-12" key={`issue-link-${item.text}`}>
										<a style={{fontFamily: 'AmazonEmber', fontSize: '14px', color: '#000000'}}>
											<img style={{cursor: 'pointer'}}
												 onClick={() => onIssueListSelectionChange(issueIndex, itemIndex)}
												 src={item.marked ? markTrueIcon : markFalseIcon}/> {item.text} </a>
									</div>
								))
							}
						</div>
					))
				}
			</div>
		</div>
	</div>
);

PredefinedIssues.propTypes = {
	onIssueListSelectionChange: PropTypes.func.isRequired,
	issueList: PropTypes.array.isRequired,
};

export default PredefinedIssues;
