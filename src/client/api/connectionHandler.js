import {onPhoneNumber} from "../reducers/acReducer";
import libphonenumber from "google-libphonenumber";

class Connection {
	constructor() {
		this.primary = undefined;
		this.thirdParty = undefined;
	}

	isSame(l, r) {
		if (!l) {
			return false;
		}
		return l.connectionId !== r.connectionId;
	}

	addPrimary(connection) {
		if (this.isSame(this.primary, connection)) {
			return undefined;
		}
		this.dispose(true);
		this.primary = connection;
		return connection;
	}

	addThirdParty(connection) {
		if (this.isSame(this.thirdParty, connection)) {
			return undefined;
		}
		this.dispose(false);
		this.thirdParty = connection;
		return connection;
	}

	getConnection(isPrimary) {
		return isPrimary ? this.primary : this.thirdParty;
	}

	dispose(isPrimary) {
		if (isPrimary) {
			this.primary = undefined;
		} else {
			this.thirdParty = undefined;
		}
		return true;
	}
}

class ConnectionHandler {
	constructor() {
		this.connection = new Connection();
		this.dispatch = undefined;

		this.phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
		this.PNF = libphonenumber.PhoneNumberFormat;

	}

	dispose() {
		this.dispatch = undefined;
		this.connection && this.connection.dispose(true) && this.connection.dispose(false);
	}

	register(dispatch) {
		this.dispatch && this.dispose();
		this.dispatch = dispatch;
	}

	mayBeUpdateConnection(connection = undefined, isPrimary = true) {
		let currentConnection = isPrimary ? this.connection.addPrimary(connection) : this.connection.addThirdParty(connection);
		if (!currentConnection) {
			return;
		}

		const address = currentConnection.getAddress();
		const phoneNumber = address && address.stripPhoneNumber();
		if (phoneNumber) {
			const temp = this.phoneUtil.parse(phoneNumber, "");
			const formatPhoneNumber = this.phoneUtil.format(temp, this.PNF.INTERNATIONAL);
			//todo with dispatch add whether is it primary or third-party
			this.dispatch(onPhoneNumber(formatPhoneNumber));
		}
	}

	// hangup a call with connection
	hangupCall(isPrimary = true) {
		let connection = this.connection && this.connection.getConnection(isPrimary);
		if (connection) {
			connection.destroy({
				success: (data) => {
					console.warn('-> hangupCall', data);
				},
				failure: (data) => {
					console.error('-> hangupCall', data);
				}
			});
		}
	}

	isOnHold(isPrimary = true) {
		let connection = this.connection && this.connection.getConnection(isPrimary);
		return connection && connection.isOnHold();
	}

	hold(isPrimary = true) {
		return new Promise((resolve, reject) => {
			let connection = this.connection && this.connection.getConnection(isPrimary);
			if (connection) {
				connection.hold({
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

	resume(isPrimary = true) {
		return new Promise((resolve, reject) => {
			let connection = this.connection && this.connection.getConnection(isPrimary);
			if (connection) {
				connection.resume({
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
