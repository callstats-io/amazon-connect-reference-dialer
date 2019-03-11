import databaseManager from "./databaseManager";

class AgentMediaManager {
	constructor() {
		this.localStream = undefined;
	}

	async getDefaultAudioOutputDevice() {
		const deviceList = await navigator.mediaDevices.enumerateDevices();
		const defaultAudioDevice = deviceList.find(device => device.kind === 'audiooutput' && device.deviceId === 'default');
		return defaultAudioDevice;
	}

	/*
		If there is a prefered audio device. return that one
		otherwise return default audio device
	 */
	async getDefaultAudioInputDevice() {
		const deviceList = await navigator.mediaDevices.enumerateDevices();
		let preferedDevice = this.getPreferedAudioInputDevice();

		if (preferedDevice) {
			const defaultAudioDevice = deviceList.find(device => device.kind === preferedDevice.kind && device.deviceId === preferedDevice.deviceId);
			if (defaultAudioDevice) {
				window.selectedDevice = defaultAudioDevice;
				return defaultAudioDevice;
			}
		}
		const defaultAudioDevice = deviceList.find(device => device.kind === 'audioinput' && device.deviceId === 'default');
		window.selectedDevice = defaultAudioDevice;
		return defaultAudioDevice;
	}

	async getInputDeviceList() {
		const deviceList = await navigator.mediaDevices.enumerateDevices();
		const inputDeviceList = deviceList.filter(device => device.kind === 'audioinput');
		return inputDeviceList;
	}

	async getDefaultAudioInputAndOutputDeviceDetails() {
		const inputDevice = await this.getDefaultAudioInputDevice();
		const outputDevice = await this.getDefaultAudioOutputDevice();
		const inputDeviceList = await this.getInputDeviceList();
		return {inputDevice, outputDevice, inputDeviceList};
	}

	setPreferedAudioInputDevice(selectedDevice = undefined) {
		let prvSelectedDevice = this.getPreferedAudioInputDevice();
		let isNew = selectedDevice.label !== (prvSelectedDevice && prvSelectedDevice.label);
		window.selectedDevice = selectedDevice;

		databaseManager.saveDefaultDevice(selectedDevice);
		// return  whether it is a new device, or old one
		return isNew;
	}

	getPreferedAudioInputDevice() {
		const selectedDevice = databaseManager.getSelectedAudioDevice();
		return selectedDevice && JSON.parse(selectedDevice);
	}

	async getUserMedia(selectedDevice = undefined) {
		const audioDeviceId = (selectedDevice && selectedDevice.deviceId) || undefined;
		const constraints = {
			audio: {deviceId: audioDeviceId},
			video: false,
		};
		this.dispose();
		return new Promise((resolve, reject) => {
			navigator.getUserMedia(constraints, stream => {
				this.localStream = stream;
				resolve(this.localStream);
			}, err => {
				reject(err);
			});
		});
	}

	overWriteGetUserMedia() {
		let original = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
		navigator.mediaDevices.getUserMedia = function (constraints) {
			const newConstraints = {
				audio: {deviceId: window.selectedDevice && window.selectedDevice.deviceId},
				video: false,
			};
			return original(newConstraints);
		}
	}

	dispose() {
		if (this.localStream) {
			this.localStream.getTracks().forEach(track => {
				track.stop();
			});
			this.localStream = undefined;
		}
	}


}

const agentMediaManager = new AgentMediaManager();
export default agentMediaManager;
