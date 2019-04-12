import React, {Component} from "react";
import PropTypes from "prop-types";
import lo from "lodash";
import sessionManager from "../../../api/sessionManager";
import styles from './agentview.css';

import endIcon from '../../../res/images/fa-mini-endcall.svg';
import holdIcon from '../../../res/images/fa-mini-hold.svg';
import resumeIcon from '../../../res/images/fa-mini-resume.svg';

import {getColorSchema} from '../../../utils/agetStateMap';


import {
    isJoined,
} from './../../../utils/acutils'

const isBothHold = (currentState) => {
    const state1 = lo.get(currentState, 'primaryConnectionState.state', 'none');
    const state2 = lo.get(currentState, 'thirdPartyConnectionState.state', 'none');
    return state1 === state2 && ['Hold', 'hold', 'On hold'].includes(state1);
};


const DURATION_MS = 1 * 1000;

class PrimaryConnection extends Component {
    constructor(props) {
        super(props);
        this.intervalId = undefined;
        this.state = {
            duration: '00:00:00',
        };
        this.endConnection = this.endConnection.bind(this);
        this.holdConnection = this.holdConnection.bind(this);
        this.resumeConnection = this.resumeConnection.bind(this);
    }

    _dispose() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    componentDidMount() {
        this._dispose();
        this.intervalId = setInterval(() => {
            let duration = sessionManager.getPrimaryConnectionDuration();
            this.setState({
                duration: duration,
            });
        }, DURATION_MS);
    }

    componentWillUnmount() {
        this._dispose();
    }

    endConnection() {
        let connection = sessionManager.getPrimaryConnection();
        sessionManager.endConnection(connection).then(success => _, err => console.error(err));
    }

    holdConnection() {
        let connection = sessionManager.getPrimaryConnection();
        sessionManager.holdConnection(connection).then(success => _, err => console.error(err));
    }

    resumeConnection() {
        let connection = sessionManager.getPrimaryConnection();
        sessionManager.resumeConnection(connection).then(success => _, err => console.error(err));
    }

    render() {
        const {currentState} = this.props;
        const stateString = sessionManager.getCurrentStateString(currentState, true);
        return (
            <div className="col-md-12 h-50"
                 style={{
                     borderBottom: `1px solid rgba(255,255,255,0.50)`,
                     backgroundColor: getColorSchema(stateString)
                 }}>
                <div className="row">
                    <div className={`col-md-8 mt-2 ${styles.agentStateMini}`}>
                        <span> {stateString} </span>
                    </div>
                    <div className="col-md-4 mt-2 text-right">
                        {isJoined(stateString) &&
                        <img className={styles.miniHoldResume} onClick={this.holdConnection} src={holdIcon}/>}
                        {isBothHold(currentState) &&
                        <img className={styles.miniHoldResume} onClick={this.resumeConnection} src={resumeIcon}/>}
                        <img className={styles.miniEnd}
                             onClick={this.endConnection}
                             src={endIcon}/>
                    </div>
                    <div className={`col-md-8 mt-1 ${styles.phoneAndDurationMini}`}>
                        <span>{sessionManager.getPrimaryConnectionPhone()}</span></div>
                    <div className={`col-md-4 mt-1 text-right ${styles.phoneAndDurationMini}`}>
                        <span>{this.state.duration}</span>
                    </div>
                </div>
            </div>
        );
    }
}

PrimaryConnection.propTypes = {
    currentState: PropTypes.object,
};

export default PrimaryConnection;
