'use strict';
import * as connectRTC from './thirdparty/connect-rtc';
import * as connectStream from './thirdparty/connect-streams';
import connectivityTest from './connectivityTest';
import lo from 'lodash';

import libphonenumber from 'google-libphonenumber';
import networkStrengthMonitor from './networkStrengthMonitor';
import audioFrequencyMonitor from './audioFrequencyMonitor';
import agentStateManager from './agentStateManager';
import agentConfigManager from './agentConfigManager';

import {
	onInitializationStateChange,
	onAgentStateChange,
	onDurationChange,
	onPhoneNumber,
	onMuteToggle,
	onChangeNetworkStrength, onAudioLevelChange
} from '../reducers/acReducer'
import {
	isAgentStateChange,
	isCallOnHoldUnhold,
	getAgentState,
	getAgentStateForHoldUnhold
} from './agenetevents';

import {
	toHMS,
	parsePhoneNumber,
} from './../utils/acutils';


const timeInMs = 1 * 1000;
const appId = "821179284";
const appSecret = "IgR4qo4cNUrP:qxkQFJYb0ITsgJHv5DZYG+Bih7tCPfmb9XlixwvlVcE=";
const ccpUrl = "https://callstatsio.awsapps.com/connect/ccp#/";

class ACManager {
	constructor() {
		console.log('ACManager initialized!');

		this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
		this.PNF = libphonenumber.PhoneNumberFormat;

		this.isInitialized = false;
		this.dispatch = undefined;
		this.currentStateDuration = {
			agent: 0,
			contact: 0,
			connection: 0,
		};
		// start timer on initialize, end timer on logout
		this.intervalID = undefined;
		this.currentAgent = undefined;
		this.currentContact = undefined;
		this.currentConnection = undefined;
		this.callstats = undefined;
		this.rttRecords = [];
		this.lastPCTRecord = undefined;
		connectivityTest.getRecords().then(success => {
			// console.warn('->','getRecords',success);
			this.rttRecords = success;
		});

	}

	onInitialize() {
		console.warn('--> initialized');
		this.setupCallstats(this.currentAgent);
		this.agentHandler(this.currentAgent);
		this.setIntervalMonitor();
	}

	onCSIOInitialize(err, msg) {
		console.warn('->', 'onCSIOInitialize', new Date(), err, msg);
	}

	onCSIOStats(stats) {
		if (stats && stats.fabricState === 'terminated') {
			return;
		}

		console.warn('->', 'onCSIOStats', new Date(), stats);
		if (stats && stats.mediaStreamTracks) {
			let track1 = lo.first(stats.mediaStreamTracks);
			let track2 = lo.last(stats.mediaStreamTracks);


			let audioIntputLevel = parseInt(track1.audioIntputLevel || track2.audioIntputLevel || 0);
			let audioOutputLevel = parseInt(track1.audioOutputLevel || track2.audioOutputLevel || 0);

			let track1Bitrate = track1.bitrate || 0;
			let track2Bitrate = track2.bitrate || 0;

			networkStrengthMonitor.addThroughput(track1Bitrate, track2Bitrate);
			audioFrequencyMonitor.addAudioLevel(audioIntputLevel, false);
			audioFrequencyMonitor.addAudioLevel(audioOutputLevel, true);

		}
	}

	onCSIORecommendedConfigCallback(config) {
		console.warn('->', 'onCSIORecommendedConfigCallback', new Date(), config);
	}

	onCSIOPrecalltestCallback(status, result) {
		console.warn('->', 'onCSIOPrecalltestCallback', new Date(), status, result);
		this.lastPCTRecord = result;
		// connectivityTest.savePrecalltest(result).then(success => {
		// 	console.warn('->', 'savePrecalltest', success);
		// });
		let throughput = lo.get(result, 'throughput', 0);
		networkStrengthMonitor.addThroughput(throughput, throughput);
	}

	setupCallstats(agent) {
		if (!connect) {
			console.error('connect object cannot be empty');
			return;
		}
		if (!agent) {
			console.error('agent object cannot be empty');
			return;
		}
		if (!CallstatsAmazonShim) {
			console.error('CallstatsAmazonShim object cannot be empty');
			return;
		}
		const localUserId = agent.getName();
		const configParams = {};

		console.warn('->>>>', 'setupCallstats', configParams);

		if (this.callstats) {
			this.callstats = undefined;
		}

		this.callstats = CallstatsAmazonShim.initialize(connect, appId, appSecret, localUserId, configParams, this.onCSIOInitialize, this.onCSIOStats);
		this.callstats.on('recommendedConfig', this.onCSIORecommendedConfigCallback.bind(this));
		this.callstats.on('preCallTestResults', this.onCSIOPrecalltestCallback.bind(this));
	}

	register(dispatch = undefined) {
		this.dispatch = dispatch;
		this.mayBeInitializeAC();
	}

	mayBeInitializeAC() {
		if (this.isInitialized) {
			return;
		}
		this.isInitialized = true;
		const containerDiv = document.getElementById('containerDiv');
		connect.core.initCCP(containerDiv, {
			ccpUrl: ccpUrl,
			loginPopup: true,
			softphone: {
				allowFramedSoftphone: false,
			}
		});
		connect.core.initSoftphoneManager({allowFramedSoftphone: true});
		connect.agent((agent) => {
			this.currentAgent = agent;
			this.onInitialize();
		});

		connect.contact(contact => {
			this.currentContact = contact;
			contact.destroy(() => {
				console.warn('->', 'contact destroyed');
				this.currentContact = undefined;
			});
			this.contactHandler(contact);
		});

		this.eventBusHandler(connect);

	}

	agentHandler(agent) {
		this.dispatch(onInitializationStateChange(true));
		agent.onOffline(() => {
			console.warn('->', 'agentHandler', 'onOffline');
		});
		agent.onError(() => {
			console.warn('->', 'agentHandler', 'onError');
		});
		agent.onMuteToggle((e) => {
			this.dispatch(onMuteToggle(e && e.muted))
		});
		agent.onRefresh((e) => {
			//todo
		});
		console.warn('->', agent.getAgentStates());
		agentStateManager.setAgentStates(agent.getAgentStates());
		agentConfigManager.setAgentConfig(agent.getConfiguration());
	}

	contactHandler(contact) {
		contact.onIncoming((incomingContact) => {
			console.warn('->', 'contactHandler', 'onIncoming', incomingContact);
		});
		contact.onAccepted((incomingContact) => {
			console.warn('->', 'contactHandler', 'onAccepted', incomingContact);
		});
		contact.onEnded(() => {
			console.warn('->', 'contactHandler', 'onEnded');
			this.currentConnection = undefined;
		});
		contact.onConnected(() => {
			const e = Object.assign({}, {newState: 'Connected'});
			const agentState = getAgentState(e);
			this.dispatch(onAgentStateChange(agentState));
		});
		contact.onConnecting(() => {
			const e = Object.assign({}, {newState: contact.isInbound() ? 'Inbound Call' : 'Outbound Call'});
			const agentState = getAgentState(e);
			this.dispatch(onAgentStateChange(agentState));
		});
		contact.onRefresh((e) => {
			//todo
		});
		const currentConnection = contact.getActiveInitialConnection();
		if (!currentConnection) {
			return;
		}
		this.currentConnection = currentConnection;
		this.connectionHandler(currentConnection);
	}

	connectionHandler(connection) {
		const address = connection.getAddress();
		const phoneNumber = address && address.stripPhoneNumber();
		if (phoneNumber) {
			const temp = this.phoneUtil.parse(phoneNumber, "");
			const formatPhoneNumber = this.phoneUtil.format(temp, this.PNF.INTERNATIONAL);
			this.dispatch(onPhoneNumber(formatPhoneNumber));
		}
	}

	eventBusHandler(connect = undefined) {
		if (connect && connect.core) {
			connect.core.getEventBus().subscribe('<<all>>', e => {
				console.info("--------------->", 'all ', e);
				if (isAgentStateChange(e)) {
					const agentState = getAgentState(e);
					this.dispatch(onAgentStateChange(agentState));
				} else if (isCallOnHoldUnhold(e)) {
					const tempAgentState = getAgentStateForHoldUnhold(e, this.currentContact);
					const agentState = getAgentState(tempAgentState);
					this.dispatch(onAgentStateChange(agentState));
				}
			});
		}
	}

	getRTTRecords() {
		return this.rttRecords;
	}

	getLastPCTRecord() {
		return this.lastPCTRecord;
	}

	setIntervalMonitor() {
		if (this.intervalID) {
			clearImmediate(this.intervalID);
			this.intervalID = undefined;
		}
		this.intervalID = setInterval(() => {
			this.mayBeUpdate();
		}, timeInMs);

	}


	mayBeUpdate() {
		const agent = this.currentAgent;
		if (agent && typeof agent.getStateDuration === 'function') {
			this.currentStateDuration.agent = agent && agent.getStateDuration();
			this.dispatch(onDurationChange('agent', toHMS(this.currentStateDuration.agent)));
		}
		let networkStrength = networkStrengthMonitor.getNetworkStrength();
		// console.warn('->', networkStrength);
		this.dispatch(onChangeNetworkStrength(networkStrength));

		let audioIntputLevel = audioFrequencyMonitor.getAudioLevel(false);
		let audioOutputLevel = audioFrequencyMonitor.getAudioLevel(true);

		// console.warn('->', audioIntputLevel, audioOutputLevel);
		this.dispatch(onAudioLevelChange(audioIntputLevel, audioOutputLevel))
	}


	// actions
	setAgentState(agentState = undefined) {
		agentState && this.currentAgent && this.currentAgent.setState(agentState, {
			success: (data) => {
				console.warn('-> setAgentState', data);
			},
			failure: (data) => {
				console.error('-> setAgentState', data);
			}
		})
	}

	downloadACLog() {
		if (connect) {
			connect.getLog().download();
		}
	}

	// hangup a call with connection
	hangupCall() {
		this.currentConnection && this.currentConnection.destroy({
			success: (data) => {
				console.warn('-> hangupCall', data);
			},
			failure: (data) => {
				console.error('-> hangupCall', data);
			}
		});
	}

	// accept a incoming call with contact
	acceptCall() {
		if (this.currentContact) {
			this.currentContact.accept({
				success: (data) => {
					console.warn('-> acceptCall', data);
				},
				failure: (data) => {
					console.error('-> acceptCall', data);
				}
			});
		}
	}

	// dial a phone number

	dialNumber(phoneNumber = null) {
		return new Promise((resolve, reject) => {
			if (!phoneNumber) {
				reject('empty number');
				return;
			}
			if (!this.currentAgent) {
				reject('agent cannot be undefined');
				return;
			}
			const endpoint = connect.Endpoint.byPhoneNumber(phoneNumber);
			this.currentAgent.connect(endpoint, {
				success: function () {
					resolve("Successfully sent outbound call")
				},
				failure: function (err) {
					reject(err);
				}
			});
		});
	}

	// update agent config
	updateAgentConfig(isSoftphone = true, phoneNumber = null) {
		return new Promise((resolve, reject) => {
			if (!this.currentAgent) {
				reject('agent cannot be undefined');
				return;
			}
			if (isSoftphone) {
				let newConfig = this.currentAgent.getConfiguration();
				newConfig.softphoneEnabled = true;
				this.currentAgent.setConfiguration(newConfig, {
					success: function () {
						resolve(newConfig);
					},
					failure: function () {
						reject("Failed to change to softphone");
					}
				})
			} else {
				if (!phoneNumber) {
					reject('empty number');
					return;
				}
				let newConfig = this.currentAgent.getConfiguration();
				newConfig.softphoneEnabled = false;
				this.currentAgent.setConfiguration(newConfig, {
					success: function () {
						resolve(newConfig);
					},
					failure: function () {
						reject("Failed to change to hardphone");
					}
				})
			}
		});
	}
}

const acManager = new ACManager();
export default acManager;
