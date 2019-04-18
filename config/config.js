const appConfig = require('./appconfig');

exports.getServerConfig = () => {
	const payload = appConfig;
	return {HTTP_PORT: payload.HTTP_PORT, NODE_ENV: payload.NODE_ENV};
};

exports.getClientConfig = () => {
	const payload = appConfig;
	return {APP_ID: payload.APP_ID, APP_SECRET: payload.APP_SECRET, CONNECT_URL: payload.CONNECT_URL};
};
