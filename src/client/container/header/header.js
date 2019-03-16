import React from "react";
import PropTypes from "prop-types";
import SVG from 'react-inlinesvg';

import statusChangeIcon from '../../res/images/change-status-icon.svg';
import dialerSettingIcon from '../../res/images/dialer-setting-icon.svg';
import csioLogo from '../../res/images/csioLogo.png';

import NetworkStrength from "../networkstrengthview/index"
import {onRequestAgentSettingsChange, onRequestAgentStateChange} from "../../reducers/acReducer";
import {connect} from "react-redux";

import styles from './header.css';

const CSIOLogo = () => (
	<div className={`col-md-1 h-100 pr-0 mr-0 pl-1`}>
		<img src={csioLogo} className={styles.csioLogo}/>
	</div>
);

const ChangeStatus = ({onClickHandler}) => (
	<div className={`col-md-5 h-100 ${styles.csioChangeStatus}`}
		 onClick={onClickHandler}>
		<span className={styles.csioHeaderText}>Change status</span>
	</div>
);

const ChangeStatusIcon = ({onClickHandler}) => (
	<div className={`col-md-2 h-100 pl-0 ${styles.acPointer}`}
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
	<div className={`col-md-2 border-left ${styles.acPointer}`}
		 onClick={onClickHandler}>
		<img src={dialerSettingIcon}/>
	</div>
);

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
		this.requestAgentStateChangeFunc = this.requestAgentStateChangeFunc.bind(this);
	}

	requestAgentStateChangeFunc() {
		const {requestAgentStateChange} = this.props;
		if (requestAgentStateChange === 'pending') {
			this.props.requestAgentStateChangeFunc('close');
		} else {
			this.props.requestAgentStateChangeFunc('pending');
		}

	}

	render() {
		return (
			<div className={`card-header ${styles.acHeader}`}>
				<div className={`row h-100`}>
					<CSIOLogo/>
					<ChangeStatus onClickHandler={this.requestAgentStateChangeFunc}/>
					<ChangeStatusIcon onClickHandler={this.requestAgentStateChangeFunc}/>
					<NetworkStrengthChange/>
					<DialerSettings onClickHandler={this.props.requestAgentSettingsChange}/>
				</div>
			</div>
		)
	}
}

Header.propTypes = {
	emptyBody: PropTypes.bool,
	requestAgentStateChange: PropTypes.string,
	requestAgentStateChangeFunc: PropTypes.func.isRequired,
	requestAgentSettingsChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	requestAgentStateChange: state.acReducer.requestAgentStateChange,
});

const mapDispatchToProps = dispatch => ({
	requestAgentStateChangeFunc: (value) => {
		dispatch(onRequestAgentStateChange(value));
	},
	requestAgentSettingsChange: () => {
		dispatch(onRequestAgentSettingsChange('pending'));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);

