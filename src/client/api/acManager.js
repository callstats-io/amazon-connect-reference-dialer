'use strict';
import * as connectRTC from './thirdparty/connect-rtc';
import * as connectStream from './thirdparty/connect-streams';
import connectivityTest from './connectivityTest';
import lo from 'lodash';

import libphonenumber from 'google-libphonenumber';
import networkStrengthMonitor from './networkStrengthMonitor';
import audioFrequencyMonitor from './audioFrequencyMonitor';
import agentStateManager from './agentStateManager';

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

		document.addEventListener('ON_INITIALIZE', this.onInitialize.bind(this), false);
	}

	onInitialize() {
		console.warn('initialized');
		this.setupCallstats(this.currentAgent);
		this.agentHandler(this.currentAgent);
		this.setIntervalMonitor();
	}

	onCSIOInitialize(err, msg) {
		console.warn('->', 'onCSIOInitialize', err, msg);
	}

	onCSIOStats(stats) {
		console.warn('->', 'onCSIOStats', stats);
		if (stats && stats.mediaStreamTracks) {
			let track1 = lo.first(stats.mediaStreamTracks);
			let track2 = lo.last(stats.mediaStreamTracks);
			console.warn('->', {track1: track1.bitrate, track2: track2.bitrate});
			networkStrengthMonitor.addThroughput(track1.bitrate || 0, track2.bitrate || 0);

			let audioIntputLevel = parseInt(track1.statsType === 'outbound-rtp' ? track1.audioIntputLevel : track2.audioIntputLevel);
			let audioOutputLevel = parseInt(track1.statsType === 'inbound-rtp' ? track1.audioOutputLevel : track2.audioOutputLevel);

			audioFrequencyMonitor.addAudioLevel(audioIntputLevel, false);
			audioFrequencyMonitor.addAudioLevel(audioOutputLevel, true);

		}
	}

	onCSIORecommendedConfigCallback(config) {
		console.warn('->', 'onCSIORecommendedConfigCallback', config);
	}

	onCSIOPrecalltestCallback(status, result) {
		console.warn('->', 'onCSIOPrecalltestCallback', status, result);
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

		console.warn(localUserId, configParams);
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
			const newEvent = new CustomEvent('ON_INITIALIZE', {});
			document.dispatchEvent(newEvent);
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
		console.warn('->', networkStrength);
		this.dispatch(onChangeNetworkStrength(networkStrength));

		let audioIntputLevel = audioFrequencyMonitor.getAudioLevel(false);
		let audioOutputLevel = audioFrequencyMonitor.getAudioLevel(true);

		console.warn('->', audioIntputLevel, audioOutputLevel);
		this.dispatch(onAudioLevelChange(audioIntputLevel, audioOutputLevel))
	}


	// actions
	setAgentState(agentState = undefined) {
		agentState && this.currentAgent && this.currentAgent.setState(agentState, success => {
			console.warn('->', success);
		}, err => {
			console.error('->', err);
		})
	}

	downloadACLog() {
		if (connect) {
			connect.getLog().download();
		}
	}

}

const acManager = new ACManager();
export default acManager;
