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
		if(!agentConn){
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
