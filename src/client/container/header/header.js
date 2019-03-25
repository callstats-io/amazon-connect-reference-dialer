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
import Quality from "../popups/quality";
import networkStrengthMonitor from "../../api/networkStrengthMonitor";

const CSIOLogo = () => (
	<div className={`col-md-2 m-0 p-0 text-center`}>
		<img src={csioLogo} className={styles.csioLogo}/>
	</div>
);

const ChangeStatus = ({onClickHandler}) => (
	<div className={`col-md-10 m-0 p-0 pl-1 ${styles.csioChangeStatus}`}
		 onClick={onClickHandler}>
		<span className={styles.csioHeaderText}>Change status</span>
		<SVG src={statusChangeIcon}/>
	</div>
);

const NetworkStrengthChange = ({toggleShowNetworkStatus}) => (
	<div className={`col-md-2 pl-0 ml-0 pr-0 mr-0 my-auto text-center`}>
		<NetworkStrength toggleShowNetworkStatus={toggleShowNetworkStatus}/>
	</div>
);
NetworkStrengthChange.propTypes = {
	toggleShowNetworkStatus: PropTypes.func.isRequired,
};

const DialerSettings = ({onClickHandler}) => (
	<div className={`col-md-2 border-left ${styles.acPointer} ${styles.leftBorder}`}
		 onClick={onClickHandler}>
		<img src={dialerSettingIcon} className={styles.dialerImage}/>
	</div>
);

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			showNetworkStatus: false,
		};
		this.requestAgentStateChangeFunc = this.requestAgentStateChangeFunc.bind(this);
		this.toggleShowNetworkStatus = this.toggleShowNetworkStatus.bind(this);
	}

	requestAgentStateChangeFunc() {
		const {requestAgentStateChange} = this.props;
		if (requestAgentStateChange === 'pending') {
			this.props.requestAgentStateChangeFunc('close');
		} else {
			this.props.requestAgentStateChangeFunc('pending');
		}

	}

	toggleShowNetworkStatus() {
		let {showNetworkStatus} = this.state;
		console.warn('~', 'toggleShowNetworkStatus', showNetworkStatus);
		this.setState({
			showNetworkStatus: !showNetworkStatus,
		});
	}

	render() {
		return (
			<div className={`card-header pt-0 pb-0 mt-0 mb-0 ${styles.acHeader}`}>
				<div className={`row h-100`}>
					<div className={'col-md-8 my-auto'}>
						<div className={`row`}>
							<CSIOLogo/>
							<ChangeStatus onClickHandler={this.requestAgentStateChangeFunc}/>
						</div>
					</div>
					<NetworkStrengthChange toggleShowNetworkStatus={this.toggleShowNetworkStatus}/>
					<DialerSettings onClickHandler={this.props.requestAgentSettingsChange}/>
				</div>
				{
					this.state.showNetworkStatus &&
					<div className={`row text-center justify-content-end`}>
						<Quality qualityValue={networkStrengthMonitor.getNetworkStrength()}/>
					</div>
				}
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

