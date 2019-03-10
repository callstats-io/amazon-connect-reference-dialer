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

		const address = connection.getAddress();
		const phoneNumber = address && address.stripPhoneNumber();
		if (phoneNumber) {
			const temp = this.phoneUtil.parse(phoneNumber, "");
			const formatPhoneNumber = this.phoneUtil.format(temp, this.PNF.INTERNATIONAL);
			this.dispatch(onPhoneNumber(formatPhoneNumber));
		}
	}
}

const connectionHandler = new ConnectionHandler();
export default connectionHandler;
