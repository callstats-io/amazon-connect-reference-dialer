const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./logger");
const helmet = require('helmet');

process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.HTTP_PORT = process.env.PORT || 8082;

function onUnhandledError(err) {
	try {
		logger.error(err);
	} catch (e) {
		console.log("LOGGER ERROR:", e); //eslint-disable-line no-console
		console.log("APPLICATION ERROR:", err); //eslint-disable-line no-console
	}
	process.exit(1);
}

process.on("unhandledRejection", onUnhandledError);
process.on("uncaughtException", onUnhandledError);

const app = express();
app.use(helmet({
	frameguard: false,
}));
app.set("env", process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);

app.use(logger.expressMiddleware);
app.use(bodyParser.json());

app.use(express.static('dist'));
http.createServer(app).listen(process.env.HTTP_PORT, () => {
	logger.info(
		`HTTP server is now running on http://localhost:${process.env.HTTP_PORT}`
	);
});
