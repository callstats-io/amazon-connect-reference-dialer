'use strict';

import audioManager from './agentMediaManager';
import agentHandler from './agentHandler';
import contactHandler from './contactHandler';
import eventHandler from './eventhandler';
import intervalMonitor from './intervalMonitor';

import csioHandler from './csioHandler';

import * as connectRTC from './thirdparty/connect-rtc';
import * as connectStream from './thirdparty/connect-streams';

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
		intervalMonitor.register(this.dispatch);
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
			this.onAgentInitialize(agent);
		});

		connect.contact(contact => {
			this.onContactInitialize(contact)
		});

		this.onEventHandler(connect);
	}


	getRTTRecords() {
		return this.rttRecords;
	}

	getLastPCTRecord() {
		return this.lastPCTRecord;
	}

	downloadACLog() {
		if (connect) {
			connect.getLog().download();
		}
	}

}

const acManager = new ACManager();
export default acManager;
