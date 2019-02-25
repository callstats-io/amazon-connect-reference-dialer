'use strict';
import * as amazonConnect from './amazon-connect';
import * as connectRTC from './connect-rtc';
import lo from 'lodash';
import {onInitializationStateChange} from './../reducers/login'

let localId;
const appId = "821179284";
const appSecret = "IgR4qo4cNUrP:qxkQFJYb0ITsgJHv5DZYG+Bih7tCPfmb9XlixwvlVcE=";
const ccpUrl = "https://callstatsio.awsapps.com/connect/ccp#/";

class ACManager {
	constructor() {
		console.log('ACManager initialized!');
		this.acManager = undefined;
		this.isInitialized = false;
		this.dispatch = undefined;

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


		connect.agent(agent=>{
			this.dispatch( onInitializationStateChange(true));
		});

		connect.core.getEventBus().subscribe('<<all>>', e => {
			// console.info("--------------->", 'all ', e);
		});
	}

}

const acManager = new ACManager();
export default acManager;
