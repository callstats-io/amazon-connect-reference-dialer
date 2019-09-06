import React from 'react';
import PropTypes from 'prop-types';

import networkStrength1 from '../../res/images/fa-network-strength-1.svg';
import networkStrength2 from '../../res/images/fa-network-strength-2.svg';
import networkStrength3 from '../../res/images/fa-network-strength-3.svg';
import networkStrength4 from '../../res/images/fa-network-strength-4.svg';
import networkStrength5 from '../../res/images/fa-network-strength-5.svg';
import networkStrengthUnknown from '../../res/images/fa-network-strength-unknown.svg';
import networkStrengthLoading from '../../res/images/fa-network-strength-unknown-2.svg';
import agentHandler from '../../api/agentHandler';
import precallTest from '../../api/precalltest';
import networkStrengthMonitor from '../../api/networkStrengthMonitor';
import { runPCT } from './../../utils/acutils';

const networkStrengthIcon = [networkStrengthLoading, networkStrengthUnknown, networkStrength1, networkStrength2, networkStrength3, networkStrength4, networkStrength5];

const getStrengthIcon = (networkStrength = -1) => {
  return networkStrengthIcon[networkStrength + 1];
};

const shouldRunPCT = () => {
  let agent = agentHandler && agentHandler.getAgent();
  let currentAgentStateName = agent && agent.getState().name;
  return runPCT(currentAgentStateName);
};

const DURATION_MS = 3000;
class NetworkStrength extends React.Component {
  constructor (props) {
    super(props);
    this.intervalId = undefined;
    this.state = {
      networkStrength: networkStrengthMonitor.getNetworkStrength()
    };
    this.mayBeUpdateNetworkStength = this.mayBeUpdateNetworkStength.bind(this);
  }

  _dispose () {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  async updateNetworkStrength () {
    let networkStrength = networkStrengthMonitor.getNetworkStrength();
    // console.warn('->', networkStrength);
    this.setState({
      networkStrength: networkStrength
    });
    if (!shouldRunPCT()) {
      return;
    }
    if (!precallTest.shouldRun()) {
      return;
    }
    try {
      await precallTest.doPrecallTest();
    } catch (err) {
      ;
    }
  }

  async componentDidMount () {
    this._dispose();
    await this.updateNetworkStrength();
    this.intervalId = setInterval(async () => {
      await this.updateNetworkStrength();
    }, DURATION_MS);
  }

  componentWillUnmount () {
    // console.warn('component will unmount');
    this._dispose();
  }

  mayBeUpdateNetworkStength (currentNetworkStrength = -1) {
    let { networkStrength } = this.state;
    // console.warn('-> ', networkStrength, currentNetworkStrength);
    if (currentNetworkStrength !== networkStrength) {
      this.setState({
        networkStrength: currentNetworkStrength
      });
    }
  }

  render () {
    this.mayBeUpdateNetworkStength(networkStrengthMonitor.getNetworkStrength());
    return (
      <img style={{ cursor: 'pointer' }}
        onMouseEnter={() => this.props.toggleShowNetworkStatus(true)}
        onMouseLeave={() => this.props.toggleShowNetworkStatus(false)}
        src={getStrengthIcon(this.state.networkStrength)}/>
    );
  }
}

NetworkStrength.propTypes = {
  toggleShowNetworkStatus: PropTypes.func.isRequired
};

export default NetworkStrength;
