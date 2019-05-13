import { sleep } from './../../utils/acutils';

export const isNeedToTransferCall = (contact = undefined) => {
  return contact && contact.isConnected();
};

export const acceptCall = (contact = undefined) => {
  return new Promise((resolve, reject) => {
    if (!contact) {
      reject(new Error('contact is null'));
      return;
    }
    contact.accept({
      success: () => {
        resolve('accept call success');
      },
      failure: (data) => {
        reject(data);
      }
    });
  });
};

export const rejectCall = (contact = undefined) => {
  return new Promise((resolve, reject) => {
    if (!contact) {
      reject(new Error('contact is null'));
      return;
    }
    let agentConn = contact.getAgentConnection();
    if (!agentConn) {
      reject(new Error('agent connection is undefined'));
    }
    agentConn.destroy({
      success: () => {
        resolve('accept call success');
      },
      failure: (data) => {
        reject(data);
      }
    });
  });
};

export const dialContact = (contact = undefined, selectedContact = undefined) => {
  return new Promise((resolve, reject) => {
    if (!contact) {
      reject(new Error('contact is undefined'));
      return;
    }
    if (!selectedContact) {
      reject(new Error('dialed selected contact is undefined'));
      return;
    }
    contact.addConnection(selectedContact, {
      success: function () {
        resolve('successfully added new contact');
      },
      failure: function (err, data) {
        reject(err);
      }
    });
  });
};

export const resumeAll = (contact = undefined) => {
  return new Promise((resolve, reject) => {
    if (!contact) {
      reject(new Error('contact is undefined'));
      return;
    }
    contact.conferenceConnections({
      success: (success) => {
        resolve(success);
      },
      failure: (err) => {
        reject(err);
      }
    });
  });
};

export const holdAll = (hold, ...connections) => {
  const holdConnections = async () => {
    for (let currentConnection of connections) {
      try {
        if (currentConnection) {
          await hold(currentConnection);
          sleep(200);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  return holdConnections();
};

export const swapCall = (contact = undefined) => {
  return new Promise((resolve, reject) => {
    if (!contact) {
      reject(new Error('contact is undefined'));
      return;
    }
    contact.toggleActiveConnections({
      success: (success) => {
        resolve(success);
      },
      failure: (err) => {
        reject(err);
      }
    });
  });
};
