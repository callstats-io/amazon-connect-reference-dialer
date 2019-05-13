'use strict';

const maxElement = 500;

class DatabaseManager {
  // eslint-disable-next-line no-useless-constructor
  constructor () {
  }

  savePrecalltestResult (result) {
    const epochTime = (new Date()).getTime();
    let retval = this.getPrecallTestResult();
    if (retval) {
      if (retval.length > maxElement) {
        retval.shift();
      }
      retval.push({ ...result, epochTime });
    }

    window.localStorage.setItem('rttResult', JSON.stringify(retval));
    return retval;
  }

  getPrecallTestResult () {
    let result = window.localStorage.getItem('rttResult') || undefined;
    if (result) {
      return JSON.parse(result);
    }
    return [];
  }

  saveDefaultDevice (defaultAudioDevice = undefined) {
    window.localStorage.setItem('defaultDevice', JSON.stringify(defaultAudioDevice));
  }

  getSelectedAudioDevice () {
    return window.localStorage.getItem('defaultDevice') || undefined;
  }

  setDefaultConnectURL (ccpURL = '') {
    window.localStorage.setItem('defaultConnectURL', ccpURL);
    return ccpURL;
  }

  getDefaultConnectURL (ccpURL = '') {
    return window.localStorage.getItem('defaultConnectURL') || ccpURL || undefined;
  }
}

const databaseManager = new DatabaseManager();
export default databaseManager;
