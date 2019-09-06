import { onMuteToggle } from '../reducers/acReducer';

class AgentHandler {
  constructor () {
    this.dispatch = undefined;
    this.agent = undefined;
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
    agent.onMuteToggle((e) => {
      this.dispatch(onMuteToggle(e && e.muted));
    });
  }

  getAgent () {
    return this.agent;
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
