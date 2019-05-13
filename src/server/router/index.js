var express = require('express');
var router = express.Router();

const {
  getClientConfig
} = require('./../../../config/config');

/* GET index page. */
router.get('/', function (req, res, next) {
  let {
    APP_ID,
    APP_SECRET,
    CONNECT_URL,
    CS_JS_SDK_URL,
    CS_AC_SHIM_URL
  } = getClientConfig();
  res.render('index', {
    APP_ID: APP_ID,
    APP_SECRET: APP_SECRET,
    CONNECT_URL: CONNECT_URL,
    CS_JS_SDK_URL: CS_JS_SDK_URL,
    CS_AC_SHIM_URL: CS_AC_SHIM_URL
  });
});

module.exports = router;
