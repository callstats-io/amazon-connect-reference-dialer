'use strict';
import * as amazonConnect from './amazon-connect';
import * as connectRTC from './connect-rtc';

// const PNF = require('google-libphonenumber').PhoneNumberFormat;
// const PhoneNumberUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

import libphonenumber from 'google-libphonenumber';

import {
	onInitializationStateChange,
	onAgentStateChange,
	onDurationChange,
	onPhoneNumber
} from '../reducers/acReducer'
import {
	isAgentStateChange,
	getAgentState
} from './agenetevents';

import {
	toHMS,
	parsePhoneNumber,
} from './../utils/acutils';


let localId;
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

	}


	mayBeUpdate() {
		const agent = this.currentAgent;
		if (agent && typeof agent.getStateDuration === 'function') {
			this.currentStateDuration.agent = agent && agent.getStateDuration();
			this.dispatch(onDurationChange('agent', toHMS(this.currentStateDuration.agent)));
		}
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
				allowFramedSoftphone: true,
			}
		});


		connect.agent((agent) => {
			this.currentAgent = agent;
			this.setIntervalMonitor();
			this.agentHandler(agent);
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
		agent.onRefresh((e) => {
			//todo
		});
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
				}
			});
		}
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


}

const acManager = new ACManager();
export default acManager;
