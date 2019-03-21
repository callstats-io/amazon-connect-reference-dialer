import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import sessionManager from './../../api/sessionManager';
import mediaManager from '../../api/mediaManager';

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
			phoneNumber: sessionManager.getAgentDeskphoneNumber() || '+358',
			softphoneEnabled: sessionManager.isAgentSoftphoneEnabled(),
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
		mediaManager.getDefaultAudioInputAndOutputDeviceDetails().then(success => {
			const {inputDevice, outputDevice, inputDeviceList} = success;
			this.updateMediaSource(inputDevice, {
				defaultAudioInputDevice: inputDevice,
				defaultAudioOutputDevice: outputDevice,
				inputDeviceList: inputDeviceList
			});
		}).catch(err => {
			console.error(err);
		});
	}

	updateMediaSource(selectedDevice, options) {
		mediaManager.getUserMedia(selectedDevice).then(
			success => this.setState({stream: success, ...options}),
			err => console.error('none'));
	}

	changeToSoftphone() {
		sessionManager.changeToSoftPhone().then(
			success => {
				mediaManager.getDefaultOrPreferredAudioInputDevice().then(selectedDevice => {
					this.updateMediaSource(selectedDevice, {softphoneEnabled: true});
				});
			},
			err => console.error(err));
	}

	changeToDeskphone() {
		const {phoneNumber} = this.state;
		sessionManager.changeToDeskphone(phoneNumber).then(
			success => this.setState({softphoneEnabled: false}),
			err => console.error(err));
	}

	toggleMenuItem() {
		const {showMenuItem} = this.state;
		this.setState({
			showMenuItem: !showMenuItem,
		});
	}

	changeAudioInputDevice(selectedDevice) {
		mediaManager.setPreferedAudioInputDevice(selectedDevice);
		mediaManager.getDefaultOrPreferredAudioInputDevice().then(selectedDevice => {
			this.updateMediaSource(selectedDevice, {
				defaultAudioInputDevice: selectedDevice,
				showMenuItem: false,
			});
		});
	}

	componentWillUnmount() {
		mediaManager.dispose();
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
									   audioInputDevice={this.state.defaultAudioInputDevice}
									   audioOutputDevice={this.state.defaultAudioOutputDevice}
									   stream={this.state.stream}
									   backgroundColor={'#ffffff'}/>
				}

				<DeskPhone changeToDeskphone={this.changeToDeskphone}
						   enabled={!this.state.softphoneEnabled}/>

				{
					!this.state.softphoneEnabled &&
					<DeskPhoneSettings handleInputChange={this.handleInputChange}
									   changeToDeskphone={this.changeToDeskphone}
									   dialableCountries={sessionManager.getDialableCountries()}
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
