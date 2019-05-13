const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger');
const config = require('./../../config/config');

const serverConfig = config.getServerConfig();
process.env.NODE_ENV = serverConfig.NODE_ENV;
process.env.HTTP_PORT = serverConfig.HTTP_PORT;

function onUnhandledError (err) {
  try {
    logger.error(err);
  } catch (e) {
    console.log('LOGGER ERROR:', e); // eslint-disable-line no-console
    console.log('APPLICATION ERROR:', err); // eslint-disable-line no-console
  }
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

const app = express();
app.set('env', process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);

app.use(logger.expressMiddleware);
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, '../../', 'dist')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const index = require('./router/index');
const compare = require('./router/compare');
const stock = require('./router/stock');
app.use('/', index);
app.use('/compare', compare);
app.use('/stock', stock);

// status check endpoint
app.get('/status', (req, res) => res.status(200).send(''));

http.createServer(app).listen(process.env.HTTP_PORT, () => {
  logger.info(
    `HTTP server is now running on http://localhost:${process.env.HTTP_PORT}`
  );
});
