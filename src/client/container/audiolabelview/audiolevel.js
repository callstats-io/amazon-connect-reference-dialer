import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import SVG from 'react-inlinesvg';
import noVoiceIcon from '../../res/images/fa-voice-no-freq.svg';
import talkingVoiceIcon from '../../res/images/agent-voice-freq-icon.svg';

const AudioLevel = ({audioLevel, muted}) => (
	<SVG src={audioLevel > 0 && muted === false ? talkingVoiceIcon : noVoiceIcon}/>
);

AudioLevel.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AudioLevel);
