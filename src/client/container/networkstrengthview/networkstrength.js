import React from "react";
import PropTypes from "prop-types";

import networkStrength1 from '../../res/images/fa-network-strength-1.svg';
import networkStrength2 from '../../res/images/fa-network-strength-2.svg';
import networkStrength3 from '../../res/images/fa-network-strength-3.svg';
import networkStrength4 from '../../res/images/fa-network-strength-4.svg';
import networkStrength5 from '../../res/images/fa-network-strength-5.svg';
import networkStrengthUnknown from '../../res/images/fa-network-strength-unknown.svg';
import agentHandler from "../../api/agentHandler";
import precallTest from "../../api/precalltest";
import networkStrengthMonitor from "../../api/networkStrengthMonitor";


const networkStrengthIcon = [networkStrengthUnknown, networkStrength1, networkStrength2, networkStrength3, networkStrength4, networkStrength5];

const getStrengthIcon = (networkStrength = 0) => {
    return networkStrengthIcon[networkStrength];
};

const shouldRunPCT = () => {
    let agent = agentHandler && agentHandler.getAgent();
    let currentState = agent && agent.getState().name;
    // console.warn('~shouldRunPCT', currentState);
    return currentState === 'Available' || currentState === 'Offline';
};

const DURATION_MS = 1 * 1000; // Every two minutes
class NetworkStrength extends React.Component {
    constructor(props) {
        super(props);
        this.intervalId = undefined;
        this.state = {
            networkStrength: networkStrengthMonitor.getNetworkStrength(),
        }
    }

    _dispose() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    // only run precall test when agent state is available, or offline
    async doPrecallTest() {
        if (!shouldRunPCT()) {
            return;
        }
        if (!precallTest.shouldRun()) {
            return;
        }
        // console.warn('doPrecallTest');
        await precallTest.doPrecallTest();

    }

    updateNetworkStrength() {
        let networkStrength = networkStrengthMonitor.getNetworkStrength();
        this.setState({
            networkStrength: networkStrength,
        });

        this.doPrecallTest().then(() => {
        }).catch(err => {
        });

    }

    componentDidMount() {
        this._dispose();
        this.updateNetworkStrength();

        this.intervalId = setInterval(() => {
            this.updateNetworkStrength();
        }, DURATION_MS);
    }

    componentWillUnmount() {
        this._dispose();
    }

    render() {
        return (
            <img style={{cursor: 'pointer'}}
                 onMouseEnter={() => this.props.toggleShowNetworkStatus(true)}
                 onMouseLeave={() => this.props.toggleShowNetworkStatus(false)}
                 src={getStrengthIcon(this.state.networkStrength)}/>
        );
    }
}

NetworkStrength.propTypes = {
    toggleShowNetworkStatus: PropTypes.func.isRequired,
};

export default NetworkStrength;
