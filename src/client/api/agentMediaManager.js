import databaseManager from "./databaseManager";

class AgentMediaManager {
	constructor() {
		this.localStream = undefined;
		this.remoteStream = undefined;
	}

	async getDefaultAudioOutputDevice() {
		const deviceList = await navigator.mediaDevices.enumerateDevices();
		const defaultAudioDevice = deviceList.find(device => device.kind === 'audiooutput' && device.deviceId === 'default');
		return defaultAudioDevice;
	}

	/*
		If there is a preferred audio device. return that one
		otherwise return default audio device
	 */
	async getDefaultOrPreferredAudioInputDevice() {
		const deviceList = await navigator.mediaDevices.enumerateDevices();
		let preferedDevice = this.getPreferedAudioInputDevice();

		// if preferred device is found in the device list
		// there can be cases where user removed the prefered device from list, and the preffered is no longer available
		let found = preferedDevice && deviceList.find(device => device.kind === preferedDevice.kind && device.deviceId === preferedDevice.deviceId);
		if (found) {
			return preferedDevice;
		}

		let defaultAudioDevice = deviceList.find(device => device.kind === 'audioinput' && device.deviceId === 'default');
		return defaultAudioDevice;
	}

	async getInputDeviceList() {
		const deviceList = await navigator.mediaDevices.enumerateDevices();
		const inputDeviceList = deviceList.filter(device => device.kind === 'audioinput');
		return inputDeviceList;
	}

	async getDefaultAudioInputAndOutputDeviceDetails() {
		const inputDevice = await this.getDefaultOrPreferredAudioInputDevice();
		const outputDevice = await this.getDefaultAudioOutputDevice();
		const inputDeviceList = await this.getInputDeviceList();
		return {inputDevice, outputDevice, inputDeviceList};
	}

	// save it in current window, and also in database
	setPreferedAudioInputDevice(selectedDevice = undefined) {
		window.selectedDevice = {...selectedDevice};
		selectedDevice && databaseManager.saveDefaultDevice(selectedDevice);
	}

	getPreferedAudioInputDevice() {
		const selectedDevice = databaseManager.getSelectedAudioDevice();
		return selectedDevice && JSON.parse(selectedDevice);
	}

	// Overwrite get user media
	overWriteGetUserMedia() {
		if (!(navigator && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function')) {
			return;
		}

		let original = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
		navigator.mediaDevices.getUserMedia = function (constraints) {
			const newConstraints = {
				audio: {deviceId: window.selectedDevice && window.selectedDevice.deviceId},
				video: false,
			};
			return original(newConstraints);
		}
	}


	async getUserMedia(selectedDevice = undefined) {
		let localStream = this.getLocalStream();
		this.dispose(localStream);

		const audioDeviceId = (selectedDevice && selectedDevice.deviceId) || undefined;
		const constraints = {
			audio: {deviceId: audioDeviceId},
			video: false,
		};
		try {
			localStream = await navigator.getUserMedia(constraints);
		} catch (err) {
			console.error('->', err);
		}
		return localStream;
	}

	setLocalStream(stream) {
		this.localStream = stream;
	}

	setRemoteStream(stream) {
		this.remoteStream = stream;
	}

	getLocalStream() {
		return this.localStream;
	}

	getRemoteStream() {
		return this.remoteStream;
	}

	// make sure we dispose local stream
	dispose(stream = undefined) {
		if (stream) {
			stream.getTracks().forEach(track => {
				track.stop();
			});
			stream = undefined;
		}
	}


}

const agentMediaManager = new AgentMediaManager();
export default agentMediaManager;
