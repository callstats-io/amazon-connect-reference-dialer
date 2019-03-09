import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import noVoiceIcon from '../../res/images/fa-voice-no-freq.svg';
import talkingVoiceIcon from '../../res/images/agent-voice-freq-icon.svg';



const AudioLevel = ({audioLevel, muted, fullHeight, style}) => (
	<img src={audioLevel > 0 && muted === false ? talkingVoiceIcon : noVoiceIcon}
		 style={style && style}/>
);

AudioLevel.propTypes = {};
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AudioLevel);
