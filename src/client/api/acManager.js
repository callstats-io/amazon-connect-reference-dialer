'use strict';
import * as amazonConnect from './amazon-connect';
import * as connectRTC from './connect-rtc';
import lo from 'lodash';
import {onInitializationStateChange, onAgentStateChange, onDurationChange} from '../reducers/acReducer'
import {isAgentStateChanage} from './agenetevents';
import {toHMS} from './../utils/time';


let localId;
const timeInMs = 1 * 1000;
const appId = "821179284";
const appSecret = "IgR4qo4cNUrP:qxkQFJYb0ITsgJHv5DZYG+Bih7tCPfmb9XlixwvlVcE=";
const ccpUrl = "https://callstatsio.awsapps.com/connect/ccp#/";

class ACManager {
	constructor() {
		console.log('ACManager initialized!');
		this.isInitialized = false;
		this.dispatch = undefined;
		this.currentStateDuration = {
			agent: 0,
			contact: 0,
			connection: 0,
		};
		// start timer on initialize, end timer on logout
		this.intervalID = undefined;

	}

	mayBeUpdate(agent = undefined, contact = undefined, connection = undefined) {
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
		let currentAgent = undefined;
		let currentContact = undefined;
		let currentConnection = undefined;

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


		connect.agent(agent => {
			currentAgent = agent;
			this.dispatch(onInitializationStateChange(true));
			if (this.intervalID) {
				clearImmediate(this.intervalID);
				this.intervalID = undefined;
			}
			this.intervalID = setInterval(() => {
				this.mayBeUpdate(currentAgent, currentContact);
			}, timeInMs);

			agent.onRefresh(e => {
				console.warn('-> onRefresh');
			})

		});

		connect.contact(contact => {
			contact.destroy(() => {
				currentContact = undefined;
			});
			currentContact = contact;
			console.warn('->', 'contact', contact);
		});


		connect.core.getEventBus().subscribe('<<all>>', e => {
			console.info("--------------->", 'all ', e);
			if (isAgentStateChanage(e)) {
				this.dispatch(onAgentStateChange(e.newState));
			}
		});
	}

}

const acManager = new ACManager();
export default acManager;
