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

import {
	onRequestAgentSettingsChange,
} from "../../reducers/acReducer";

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
		const dialableCountries = agentConfigManager.getDialableCountries();
		return (
			<div className="card-body" style={{backgroundColor: '#ffffff'}}>
				<div className="row ">
					<div className="col-md-10">
						<p style={{color: '#000000', fontSize: '18px', fontFamily: 'AmazonEmber'}}>Settings</p>
					</div>
					<div className="col-md-2"
						 onClick={() => this.closeSetting('')}>
						<img src={closeOrDismissIcon} style={{cursor: 'pointer'}}/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12">
						<p style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber'}}>Phone
							type</p>
					</div>
				</div>
				<div className="row" style={{cursor: 'pointer'}}
					 onClick={() => this.changeToSoftphone()}>
					<div className="col-md-2">
						<img src={this.state.softphoneEnabled ? circleMarkIcon : circleUnmarkIcon}/></div>
					<div className="col-md-10">
						<p style={{
							color: '#000000',
							fontSize: '14px',
							fontFamily: 'AmazonEmber',
							marginTop: '1%'
						}}>Softphone</p>
					</div>
				</div>
				{
					this.state.softphoneEnabled &&
					<div className="row">
						<div className="col-md-10 pr-0 mr-0">
							<div className="btn-group" style={{maxWidth: '220px'}}>
								<button className="btn" type="button" style={{
									border: 'solid 1px #cfcfcf',
									fontFamily: 'AmazonEmber',
									fontSize: '13px',
									maxHeight: '45px',
									minWidth: '200px',
								}} onClick={() => this.toggleMenuItem()}> {this.state.defaultAudioInputDevice.label}
								</button>
								<button onClick={() => this.toggleMenuItem()} type="button"
										className="btn dropdown-toggle dropdown-toggle-split"
										aria-haspopup="true" aria-expanded="false"
										style={{border: 'solid 1px #cfcfcf'}}>
									<span className="sr-only">Toggle Dropdown</span>
								</button>
								<div className={`dropdown-menu ${this.state.showMenuItem && 'show'}`}
									 x-placement="bottom-start" style={{
									position: 'absolute',
									willChange: 'transform',
									top: '0px',
									left: '0px',
									transform: 'translate3d(0px, 38px, 0px)',
									border: 'solid 1px #cfcfcf'
								}}>
									{
										this.state.inputDeviceList.map((item, indx) => (
											<a key={`${item.deviceId}-${indx}`} className="dropdown-item"
											   onClick={() => this.changeAudioInputDevice(item)}
											   href="#" style={{
												fontFamily: 'AmazonEmber',
												fontSize: '13px',
											}}>{item.label}</a>
										))
									}
								</div>

							</div>
						</div>
						<div className="col-md-2 pl-0 pr-0">
							<AudioLevel backgroundColor={'#ffffff'} stream={this.state.stream}/>
						</div>
					</div>
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
				<div className="row" style={{cursor: 'pointer'}}
					 onClick={() => this.changeToDeskphone()}>
					<div className="col-md-2">
						<img src={this.state.softphoneEnabled ? circleUnmarkIcon : circleMarkIcon}/>
					</div>
					<div className="col-md-10">
						<p style={{color: '#000000', fontSize: '14px', fontFamily: 'AmazonEmber', marginTop: '1%'}}>Desk
							phone</p>
					</div>
				</div>
				{
					!this.state.softphoneEnabled &&
					<div className={"row"}>
						<div className={"col-md-9"}>
							<ReactPhoneInput inputStyle={{minWidth: '15.5em', maxWidth: '15.5em'}}
											 onlyCountries={dialableCountries}
											 defaultCountry={'fi'}
											 enableSearchField={true}
											 value={this.state.phoneNumber}
											 inputExtraProps={{
												 name: 'phone',
												 required: true,
												 autoFocus: true
											 }}
											 onChange={this.handleInputChange}/>
						</div>
						<div className="col-md-3 p-0 m-0">
							<a className="btn" style={{
								backgroundColor: '#a3acb6',
								fontFamily: 'AmazonEmber',
								color: '#ffffff',
								height: '35px',
								lineHeight: '1.3em',
								cursor: 'pointer',
							}} onClick={() => this.changeToDeskphone()}>
								Save
							</a>
						</div>
					</div>
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
