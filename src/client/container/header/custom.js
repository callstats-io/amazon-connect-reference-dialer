import React from "react";
import PropTypes from "prop-types";
import SVG from 'react-inlinesvg';

import statusChangeIcon from '../../res/images/change-status-icon.svg';
import dialerSettingIcon from '../../res/images/dialer-setting-icon.svg';
import csioLogo from '../../res/images/csioLogo.png';

import NetworkStrength from "../networkstrengthview/index"

const HeaderStyle = {
	parent: {
		backgroundColor: '#525252',
		height: '48px'
	},
	csioLogo:{
		width: '24px',
		height: '24px',
	},
	changeStatus: {
		paddingRight: '0px',
	},
	showCursor: {
		cursor: 'pointer',
	},
	textStyle: {
		fontFamily: 'AmazonEmber',
		color: '#ffffff'
	}
};

const CSIOLogo = () => (
	<div className={`col-md-1 h-100 pr-0 mr-0 pl-1`}>
		<img src={csioLogo} style={{...HeaderStyle.csioLogo}}/>
	</div>
);

const ChangeStatus = ({onClickHandler}) => (
	<div className={`col-md-5 h-100`} style={{...HeaderStyle.changeStatus, ...HeaderStyle.showCursor}}
		 onClick={onClickHandler}>
		<p style={HeaderStyle.textStyle}>Change status</p>
	</div>
);

const ChangeStatusIcon = ({onClickHandler}) => (
	<div className={`col-md-2 h-100 pl-0`} style={HeaderStyle.showCursor}
		 onClick={onClickHandler}>
		<SVG src={statusChangeIcon}/>
	</div>
);

const NetworkStrengthChange = () => (
	<div className={`col-md-2 h-100`}>
		<NetworkStrength/>
	</div>
);

const DialerSettings = ({onClickHandler}) => (
	<div className={`col-md-2 border-left`} style={HeaderStyle.showCursor}
		 onClick={onClickHandler}>
		<img src={dialerSettingIcon}/>
	</div>
);

const Custom = ({agentState = 'unknown', requestAgentStateChange, requestAgentSettingsChange}) => (
	<div className={`card-header`} style={HeaderStyle.parent}>
		<div className={`row h-100`}>
			<CSIOLogo/>
			<ChangeStatus onClickHandler={requestAgentStateChange}/>
			<ChangeStatusIcon onClickHandler={requestAgentStateChange}/>
			<NetworkStrengthChange/>
			<DialerSettings onClickHandler={requestAgentSettingsChange}/>
		</div>
	</div>
);


Custom.propTypes = {
	emptyBody: PropTypes.bool,
	agentState: PropTypes.string,
	requestAgentStateChange: PropTypes.func.isRequired,
	requestAgentSettingsChange: PropTypes.func.isRequired,
};

export default Custom;