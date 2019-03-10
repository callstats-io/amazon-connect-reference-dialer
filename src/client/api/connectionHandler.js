import {onPhoneNumber} from "../reducers/acReducer";
import libphonenumber from "google-libphonenumber";

class ConnectionHandler {
	constructor() {
		this.connection = undefined;
		this.dispatch = undefined;


		this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
		this.PNF = libphonenumber.PhoneNumberFormat;

	}

	dispose() {
		this.dispatch = undefined;
		this.connection = undefined;
	}

	register(dispatch, connection) {
		this.dispatch && this.dispose();
		this.dispatch = dispatch;
		this.connection = connection;

		console.warn('->>> ConnectionHandler', this.connection);

		const address = connection.getAddress();
		const phoneNumber = address && address.stripPhoneNumber();
		if (phoneNumber) {
			const temp = this.phoneUtil.parse(phoneNumber, "");
			const formatPhoneNumber = this.phoneUtil.format(temp, this.PNF.INTERNATIONAL);
			this.dispatch(onPhoneNumber(formatPhoneNumber));
		}
	}

	// hangup a call with connection
	hangupCall() {
		if (this.connection) {
			this.connection.destroy({
				success: (data) => {
					console.warn('-> hangupCall', data);
				},
				failure: (data) => {
					console.error('-> hangupCall', data);
				}
			});
		}
	}

	isOnHold() {
		return this.connection && this.connection.isOnHold();
	}

	hold() {
		return new Promise((resolve, reject) => {
			if (this.connection) {
				this.connection.hold({
					success: function () {
						resolve(null);
					},
					failure: function () {
						reject('failed');
					}
				});
			}
		});
	}

	resume() {
		return new Promise((resolve, reject) => {
			if (this.connection) {
				this.connection.resume({
					success: function () {
						resolve(null);
					},
					failure: function () {
						reject('failed');
					}
				});
			}
		});
	}
}

const connectionHandler = new ConnectionHandler();
export default connectionHandler;
