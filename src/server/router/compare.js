var express = require('express');
var router = express.Router();

const {
  getClientConfig
} = require('./../../../config/config');

const {
  getServerConfig
} = require('./../../../config/config');

/* GET index page. */
router.get('/', function (req, res, next) {
  let {
    APP_ID,
    APP_SECRET,
    CONNECT_URL,
    CS_JS_SDK_URL,
    CS_AC_SHIM_URL,
    CS_VERSION,
    ENABLE_JABRA_COLLECTION
  } = getClientConfig();
  const isProduction = getServerConfig().NODE_ENV === 'production' || getServerConfig().NODE_ENV === 'prod';
  res.render('compare', {
    APP_ID: APP_ID,
    APP_SECRET: APP_SECRET,
    CONNECT_URL: CONNECT_URL,
    CS_JS_SDK_URL: CS_JS_SDK_URL,
    CS_AC_SHIM_URL: CS_AC_SHIM_URL,
    IS_PRODUCTION: isProduction,
    CS_VERSION: CS_VERSION,
    ENABLE_JABRA_COLLECTION: ENABLE_JABRA_COLLECTION
  });
});

module.exports = router;
