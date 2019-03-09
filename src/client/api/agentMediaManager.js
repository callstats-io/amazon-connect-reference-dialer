class AgentMediaManager {
	constructor() {
		this.selectedDevice = undefined;
		this.localStream = undefined;
	}

	async getDefaultAudioOutputDevice() {
		const deviceList = await navigator.mediaDevices.enumerateDevices();
		const defaultAudioDevice = deviceList.find(device => device.kind === 'audiooutput' && device.deviceId === 'default');
		return defaultAudioDevice;
	}

	async getDefaultAudioInputDevice() {
		const deviceList = await navigator.mediaDevices.enumerateDevices();
		const defaultAudioDevice = deviceList.find(device => device.kind === 'audioinput' && device.deviceId === 'default');
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

	setDefaultDevice(selectedDevice = undefined) {
		let isNew = selectedDevice.label !== (this.selectedDevice && this.selectedDevice.label);
		this.selectedDevice = selectedDevice;
		window.selectedDevice = selectedDevice;
		return isNew
	}

	getDefaultDevice() {
		return this.selectedDevice;
	}

	getUserMedia() {
		const audioDeviceId = (this.selectedDevice && this.selectedDevice.deviceId) || undefined;
		const videoDeviceId = undefined;
		const constraints = {
			audio: {deviceId: audioDeviceId},
			video: false,
		};
		if (this.localStream) {
			this.localStream.getTracks().forEach(track => {
				track.stop();
			});
		}
		return new Promise((resolve, reject) => {
			navigator.getUserMedia(constraints, success => {
				this.localStream = success;
				resolve(success);
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
		}
	}


}

const agentMediaManager = new AgentMediaManager();
export default agentMediaManager;
