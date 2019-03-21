export const holdConnection = (connection) => {
	return new Promise((resolve, reject) => {
		if (!connection) {
			reject('connection is empty');
			return;
		}
		connection.hold({
			success: function () {
				resolve(null);
			},
			failure: function () {
				reject('failed');
			}
		});

	});
};

export const resumeConnection = (connection) => {
	return new Promise((resolve, reject) => {
		if (!connection) {
			reject('connection is empty');
			return;
		}
		connection.resume({
			success: function () {
				resolve(null);
			},
			failure: function () {
				reject('failed');
			}
		});

	});
};
