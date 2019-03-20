'use strict';

import audioManager from './agentMediaManager';
import agentHandler from './agentHandler';
import contactHandler from './contactHandler';
import eventHandler from './eventhandler';

import csioHandler from './csioHandler';

import * as connectRTC from './thirdparty/connect-rtc';
import * as amazonConnect from './thirdparty/amazon-connect';

const ccpUrl = "https://callstatsio.awsapps.com/connect/ccp#/";

class ACManager {
	constructor() {
		console.log('ACManager initialized!');

		this.isInitialized = false;
		this.dispatch = undefined;
		this.onAgentInitialize = this.onAgentInitialize.bind(this);
		this.onContactInitialize = this.onContactInitialize.bind(this);
		this.onEventHandler = this.onEventHandler.bind(this);

	}

	onAgentInitialize(agent) {
		audioManager.overWriteGetUserMedia();
		csioHandler.register(this.dispatch, agent);
		agentHandler.register(this.dispatch, agent);
	}

	onContactInitialize(contact) {
		contactHandler.register(this.dispatch, contact);
	}

	onEventHandler(connect) {
		eventHandler.register(this.dispatch, connect);
	}

	register(dispatch = undefined) {
		this.dispatch = dispatch;
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
			console.warn('new agent ', agent);
			window.currentAgent = agent;
			this.onAgentInitialize(agent);
		});

		connect.contact(contact => {
			console.warn('new contact', contact);
			window.currentContact = contact;
			this.onContactInitialize(contact)
		});

		this.onEventHandler(connect);
	}


	downloadACLog() {
		if (connect) {
			connect.getLog().download();
		}
	}

}

const acManager = new ACManager();
export default acManager;
