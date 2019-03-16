import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import agentConfigManager from './../../api/agentConfigManager';
import agentMediaManager from './../../api/agentMediaManager';

import Settings from './components/settings';

import {
	onRequestAgentSettingsChange,
} from "../../reducers/acReducer";
import PhoneType from "./components/phonetype";
import DeskPhone from "./components/deskphone";
import DeskPhoneSettings from "./components/desktopsettings";
import SoftPhone from "./components/softphone";


import styles from './settings.css';
import SoftPhoneSettings from "./components/softphonesettings";

class Body extends Component {
	constructor(props) {
		super(props);
		this.state = {
			phoneNumber: agentConfigManager.getDeskphoneNumber() || '+358',
			softphoneEnabled: agentConfigManager.isSoftphoneEnabled(),
			defaultAudioOutputDevice: {},
			defaultAudioInputDevice: {},
			inputDeviceList: [],
			showMenuItem: false,
			stream: undefined,
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.changeToSoftphone = this.changeToSoftphone.bind(this);
		this.changeToDeskphone = this.changeToDeskphone.bind(this);
		this.closeSetting = this.closeSetting.bind(this);
		this.toggleMenuItem = this.toggleMenuItem.bind(this);
		this.changeAudioInputDevice = this.changeAudioInputDevice.bind(this);
	}

	componentDidMount() {
		agentMediaManager.getDefaultAudioInputAndOutputDeviceDetails().then(success => {
			const {inputDevice, outputDevice, inputDeviceList} = success;
			this.setState({
				defaultAudioInputDevice: inputDevice,
				defaultAudioOutputDevice: outputDevice,
				inputDeviceList: inputDeviceList,
			});
			this.updateMediaSource(inputDevice);
		}).catch(err => {
			console.error(err);
		});
	}

	updateMediaSource(selectedDevice) {
		agentMediaManager.getUserMedia(selectedDevice).then(success => {
			this.setState({
				stream: success,
			})
		}, err => {
			console.error('none');
		})
	}

	changeToSoftphone() {
		agentConfigManager.updateAgentConfig(true).then(success => {
			agentConfigManager.setCurrentConfig(success);
			this.setState({
				softphoneEnabled: true,
			});
			agentMediaManager.getDefaultOrPreferredAudioInputDevice().then(selectedDevice => {
				this.updateMediaSource(selectedDevice);
			});
		}, err => {
			console.error(err);
		})
	}

	changeToDeskphone() {
		const {phoneNumber} = this.state;
		agentConfigManager.updateAgentConfig(false, phoneNumber).then(success => {
			agentConfigManager.setCurrentConfig(success);
			this.setState({
				softphoneEnabled: false,
			})
		}, err => {
			console.error(err);
		})
	}

	toggleMenuItem() {
		const {showMenuItem} = this.state;
		this.setState({
			showMenuItem: !showMenuItem,
		});
	}

	changeAudioInputDevice(selectedDevice) {
		this.setState({
			defaultAudioInputDevice: selectedDevice,
			showMenuItem: false,
		});

		let isNew = agentMediaManager.setPreferedAudioInputDevice(selectedDevice);
		if (isNew) {
			agentMediaManager.getDefaultOrPreferredAudioInputDevice().then(selectedDevice => {
				this.updateMediaSource(selectedDevice);
			});
		}
	}

	handleInputChange(value) {
		this.setState({
			phoneNumber: value
		});
	}

	closeSetting() {
		this.props.closeSetting();
	}

	render() {
		return (
			<div className={`card-body ${styles.cardBody}`}>
				<Settings closeSettings={this.closeSetting}/>

				<PhoneType/>

				<SoftPhone changeToSoftphone={this.changeToSoftphone}
						   enabled={this.state.softphoneEnabled}/>
				{
					this.state.softphoneEnabled &&
					<SoftPhoneSettings toggleMenuItem={this.toggleMenuItem}
									   changeAudioInputDevice={this.changeAudioInputDevice}
									   showMenuItem={this.state.showMenuItem}
									   inputDeviceList={this.state.inputDeviceList}
									   audioDevice={this.state.defaultAudioInputDevice}/>
				}

				<DeskPhone changeToDeskphone={this.changeToDeskphone}
						   enabled={!this.state.softphoneEnabled}/>

				{
					!this.state.softphoneEnabled &&
					<DeskPhoneSettings handleInputChange={this.handleInputChange}
									   changeToDeskphone={this.changeToDeskphone}
									   dialableCountries={agentConfigManager.getDialableCountries()}
									   phoneNumber={this.state.phoneNumber}/>
				}
			</div>
		);
	}
}

Body.propTypes = {
	closeSetting: PropTypes.func.isRequired,
	requestAgentSettingsChange: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	closeSetting: () => {
		dispatch(onRequestAgentSettingsChange('close'));
	},
	requestAgentSettingsChange: () => {
		dispatch(onRequestAgentSettingsChange('complete'))
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Body);
