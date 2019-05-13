const fs = require('fs');
const path = require('path');

const appConfig = require('./appconfig');

exports.getServerConfig = () => {
  const payload = appConfig;

  let serverConfig = {
    HTTP_PORT: process.env.HTTP_PORT || payload.HTTP_PORT,
    NODE_ENV: process.env.NODE_ENV || payload.NODE_ENV
  };
  console.warn('$ serverConfig', serverConfig);
  return serverConfig;
};

exports.getClientConfig = () => {
  const payload = appConfig;
  const clientConfig = {
    APP_ID: process.env.APP_ID || payload.APP_ID,
    APP_SECRET: process.env.APP_SECRET || payload.APP_SECRET,
    CONNECT_URL: process.env.CONNECT_URL || payload.CONNECT_URL,
    CS_JS_SDK_URL: process.env.CS_JS_SDK_URL || payload.CS_JS_SDK_URL,
    CS_AC_SHIM_URL: process.env.CS_AC_SHIM_URL || payload.CS_AC_SHIM_URL
  };
  console.warn('$ clientConfig', clientConfig);
  return clientConfig;
};

exports.writeConfig = () => {
  let payload = { ...appConfig };
  if (process.env.APP_ID) payload.APP_ID = process.env.APP_ID;
  if (process.env.APP_SECRET) payload.APP_SECRET = process.env.APP_SECRET;
  if (process.env.CONNECT_URL) payload.CONNECT_URL = process.env.CONNECT_URL;
  if (process.env.CS_JS_SDK_URL) payload.CS_JS_SDK_URL = process.env.CS_JS_SDK_URL;
  if (process.env.CS_AC_SHIM_URL) payload.CS_AC_SHIM_URL = process.env.CS_AC_SHIM_URL;
  if (process.env.HTTP_PORT) payload.HTTP_PORT = process.env.HTTP_PORT;
  if (process.env.NODE_ENV) payload.NODE_ENV = process.env.NODE_ENV;
  console.warn('$ >', payload);
  const fullPath = path.join(__dirname, 'appconfig.json');
  fs.writeFileSync(fullPath, JSON.stringify(payload, null, 2));
};
