import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SVG from 'react-inlinesvg';

import statusChangeIcon from './../res/images/change-status-icon.svg';
import networkStrengthIcon from './../res/images/network-strength-icon.svg';
import dialerSettingIcon from './../res/images/dialer-setting-icon.svg';

import {
	onRequestAgentStateChange
} from '../reducers/acReducer'

// todo will come from file or API later on
const availableStatus = [
	{name: 'Available', active: true},
	{name: 'Offline', active: false},
	{name: 'Quality Issue', active: false},
];

class CardHeader extends Component {
	constructor(props) {
		super(props);
	}

	requestAgentStateChange() {
		this.props.requestAgentStateChange();
	}

	render() {
		const agentState = this.props.agentState;
		return (
			<div className={`card-header`} style={{backgroundColor: '#2c6cb4', height: '48px'}}>
				<div className={`row h-100`}>
					<div className={`col-md-5 h-100`} style={{paddingRight: '0px', cursor: 'pointer'}}
						 onClick={this.requestAgentStateChange()}>
						<p style={{fontFamily: 'AmazonEmber', color: '#ffffff'}}>Change status</p>
					</div>
					<div className={`col-md-3 h-100 pl-0`} style={{cursor: 'pointer'}}
						 onClick={this.requestAgentStateChange()}>
						<SVG src={statusChangeIcon}/>
					</div>
					<div className={`col-md-2 h-100`}>
						<SVG src={networkStrengthIcon}/>
					</div>
					<div className={`col-md-2 border-left`}>
						<SVG src={dialerSettingIcon}/>
					</div>
				</div>
			</div>
		);
	}
}

CardHeader.propTypes = {
	agentState: PropTypes.string.isRequired,
	requestAgentStateChange: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
	agentState: state.acReducer.agentState || 'unknown',
});

const mapDispatchToProps = dispatch => ({
	changeAgentStatusProp: () => {
		dispatch(onRequestAgentStateChange('pending'));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CardHeader);
