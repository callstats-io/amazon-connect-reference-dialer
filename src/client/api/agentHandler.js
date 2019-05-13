import { onInitializationStateChange, onMuteToggle } from '../reducers/acReducer';

class AgentHandler {
  constructor () {
    this.dispatch = undefined;
    this.agent = undefined;
    this.session = undefined;
    this.loginWindow = undefined;
  }

  dispose () {
    this.dispatch = undefined;
    this.agent = undefined;
  }

  register (dispath = undefined, agent) {
    this.dispatch && this.dispose();

    this.dispatch = dispath;
    this.agent = agent;

    this.disposeLoginWindow();
    this.dispatch(onInitializationStateChange(true));
    agent.onMuteToggle((e) => {
      this.dispatch(onMuteToggle(e && e.muted));
    });
    // hack to get remote stream
    connect.contact(contact => {
      contact.onSession(session => {
        this.session = session;
      });
    });
  }

  getAgent () {
    return this.agent;
  }

  getSession () {
    return this.session;
  }

  getPc () {
    return this.session && this.session._pc;
  }

  setLoginWindow (loginWindow = undefined) {
    this.loginWindow = loginWindow;
  }

  disposeLoginWindow () {
    if (this.loginWindow) {
      if (typeof this.loginWindow.close === 'function') {
        this.loginWindow.close();
      }
      this.loginWindow = undefined;
    }
  }
}

const agentHandler = new AgentHandler();
export default agentHandler;
