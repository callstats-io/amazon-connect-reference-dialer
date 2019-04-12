import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import AgentStatusAndAudioLabel from "./agentStatusAndAudioLabel";
import AgentMutedLabel from './AgentMutedLabel';
import PeerAndAgentDuration from './PeerAndAgentDuration';

import sessionManager from './../../../api/sessionManager';
import {getColorSchema} from '../../../utils/agetStateMap';
import Error from '../../errors/index';


class UpperBody extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const hasError = this.props.errorMessage && this.props.errorMessage.errorType;
        const state = sessionManager.getCurrentStateString(this.props.currentState, true);

        return (
            <div className={`row`}
                 style={{height: '182px', backgroundColor: getColorSchema(state), paddingTop: '5%'}}>
                {!hasError &&
                <AgentStatusAndAudioLabel currentState={state}
                                          muted={this.props.muted}/>}
                {!hasError &&
                <AgentMutedLabel muted={this.props.muted}/>}

                {!hasError &&
                <PeerAndAgentDuration currentState={state}
                                      remoteStream={this.props.remoteStream}/>}
                {hasError &&
                <Error errorMessage={this.props.errorMessage}/>}
            </div>
        );
    }
}

UpperBody.propTypes = {
    currentState: PropTypes.object,
    muted: PropTypes.bool,
    remoteStream: PropTypes.object,
    errorMessage: PropTypes.object

};
const mapStateToProps = state => ({
    currentState: state.acReducer.currentState,
    muted: state.acReducer.muted,
    remoteStream: state.acReducer.remoteStream,
    errorMessage: state.acReducer.errorMessage,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UpperBody);
