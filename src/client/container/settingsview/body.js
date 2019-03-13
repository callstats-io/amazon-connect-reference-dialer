import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import agentConfigManager from './../../api/agentConfigManager';
import agentMediaManager from './../../api/agentMediaManager';

import closeOrDismissIcon from '../../res/images/fa-close-or-dismiss.svg';
import circleMarkIcon from '../../res/images/fa-circle-mark.svg';
import circleUnmarkIcon from '../../res/images/fa-circle-unmark.svg';
import AudioLevel from '../audiolabelview/audiolevel';
import ReactPhoneInput from 'react-phone-input-2';

import Settings from './components/settings';

import {
	onRequestAgentSettingsChange,
} from "../../reducers/acReducer";
import PhoneType from "./components/phonetype";
import DeskPhone from "./components/deskphone";
import DeskPhoneSettings from "./components/desktopsettings";
import SoftPhone from "./components/softphone";
import DropDownOptions from "./components/dropdown-options";

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
			<div className="card-body" style={{backgroundColor: '#ffffff'}}>
				<Settings closeSettings={this.closeSetting}/>
				<PhoneType/>

				<SoftPhone changeToSoftphone={this.changeToSoftphone}
						   enabled={this.state.softphoneEnabled}/>

				{
					this.state.softphoneEnabled &&
					<DropDownOptions audioDevice={this.state.defaultAudioInputDevice &&
					this.state.defaultAudioInputDevice.label}
									 changeAudioInputDevice={this.changeAudioInputDevice}
									 inputDeviceList={this.state.inputDeviceList}
									 showMenuItem={this.state.showMenuItem}
									 toggleMenuItem={this.toggleMenuItem}/>
				}
				{
					this.state.softphoneEnabled &&
					<div className="row mb-2">
						<div className="col-md-12">
							<div className={"row"}>
								<div className={"col-md-12"}>
									<span className="ml-1" style={{
										height: '15px',
										opacity: '0.6',
										fontFamily: 'AmazonEmber',
										fontSize: '12px',
										color: '#000000'
									}}> Audio output device </span>
								</div>
							</div>

							<div className={"row"}>
								<div className={"col-md-12"}>
									<span className="ml-1" style={{
										height: '17px',
										fontFamily: 'AmazonEmber',
										fontSize: '14px',
										color: '#000000'
									}}> {this.state.defaultAudioOutputDevice.label} </span>
								</div>
							</div>
						</div>
					</div>
				}


				<DeskPhone changeToDeskphone={this.changeToDeskphone} enabled={!this.state.softphoneEnabled}/>
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
