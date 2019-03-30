const fs = require('fs');
const path = require('path');
const FILE_NAME = 'appconfig.json';
const DEFAULT_FILE_NAME = 'default.appconfig.json';

exports.getServerConfig = () => {
	this.filePath = path.join(__dirname, FILE_NAME);
	const config = fs.readFileSync(this.filePath);
	const payload = JSON.parse(config);
	return {HTTP_PORT: payload.HTTP_PORT, NODE_ENV: payload.NODE_ENV};
};

exports.getClientConfig = () => {
	const config = fs.readFileSync(this.filePath);
	const payload = JSON.parse(config);
	return {APP_ID: payload.APP_ID, APP_SECRET: payload.APP_SECRET, CONNECT_URL: payload.CONNECT_URL};
};
