export const isNeedToTransferCall = (contact = undefined) => {
	return contact && contact.isConnected();
};

export const acceptCall = (contact = undefined) => {
	return new Promise((resolve, reject) => {
		if (!contact) {
			reject('contact is null');
			return;
		}
		contact.accept({
			success: () => {
				resolve('accept call success')
			},
			failure: (data) => {
				reject(data)
			}
		});
	});
};

export const rejectCall = (contact = undefined) => {
	return new Promise((resolve, reject) => {
		if (!contact) {
			reject('contact is null');
			return;
		}
		let agentConn = contact.getAgentConnection();
		if (!agentConn) {
			reject('agent connection is undefined')
		}
		agentConn.destroy({
			success: () => {
				resolve('accept call success')
			},
			failure: (data) => {
				reject(data)
			}
		});
	});
};

export const dialContact = (contact = undefined, selectedContact = undefined) => {
	return new Promise((resolve, reject) => {
		if (!contact) {
			reject('contact is undefined');
			return;
		}
		if (!selectedContact) {
			reject('dialed selected contact is undefined');
			return;
		}
		contact.addConnection(selectedContact, {
			success: function () {
				resolve('successfully added new contact');
			},
			failure: function (err, data) {
				reject({err, data});
			}
		});
	});
};

export const resumeAll = (contact = undefined) => {
	return new Promise((resolve, reject) => {
		if (!contact) {
			reject('contact is undefined');
			return;
		}
		contact.conferenceConnections({
			success: (success) => {
				resolve(success);
			},
			failure: (err) => {
				reject(err);
			}
		});

	});
};
