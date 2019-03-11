import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import lo from 'lodash';

import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';
import {onCCPError} from "../../reducers/acReducer";

const formatText = (msg) => {
	if (!msg) {
		return '';
	}

	let tokens = msg.split('_');
	let retval = tokens.map(token => {
		return lo.capitalize(token);
	}).join(' ');
	return retval;
};

const Error = ({agentState, errorMessage = {}, closeError}) => (
	<div className={`col-md-12 mr-0 ml-0`}>
		<div className={'row ml-0 mr-0'} style={{
			borderRadius: '2px',
			boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
			backgroundColor: '#ffffff',
			height: '148px',
		}}>
			<div className="col-md-10 mt-2" style={{height: '16px'}}>
				<p style={{
					color: '#c91922',
					fontSize: '16px',
					fontFamily: 'AmazonEmber'
				}}> {formatText(errorMessage.errorType)}</p>
			</div>
			<div className="col-md-2 mt-2" style={{height: '16px'}}
				 onClick={closeError}>
				<img src={closeOrDismissIcon} style={{cursor: 'pointer'}}/>
			</div>

			<div className={'col-md-12'}>
				<p style={{
					fontFamily: 'AmazonEmber',
					fontSize: '14px',
					color: '#000000'
				}}>
					{errorMessage.errorMessage || ''}
				</p>
			</div>

		</div>
	</div>
);


Error.propTypes = {
	agentState: PropTypes.string,
	errorMessage: PropTypes.object,
	closeError: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
	closeError: () => {
		dispatch(onCCPError({}))
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Error);
