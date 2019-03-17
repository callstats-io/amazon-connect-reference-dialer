import React from "react";
import AudioMeter from './audiometer'
import PropTypes from "prop-types";
import agentMediaManager from './../../api/agentMediaManager';

const isSame = (inputDevice = undefined, prvInputDevice = undefined) => {
	return (inputDevice && inputDevice.groupId) === (prvInputDevice && prvInputDevice.groupId);
};

class AudioLevel extends React.Component {
	constructor(props) {
		super(props);
		this.audioMeter = new AudioMeter(props.backgroundColor);
	}

	shouldComponentUpdate(nextProps) {
		const {stream, audioInputDevice} = nextProps;
		const same = isSame(audioInputDevice, this.props.audioInputDevice);
		if (same) {
			return false;
		}
		// dispose previous audio source if there is any
		console.warn('shouldComponentUpdate', stream, audioInputDevice);
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(stream, canvasCtx, canvas, nextProps.backgroundColor);
		return true;
	}

	componentDidMount() {
		console.warn('<< ', 'componentDidMount', this.props.stream);
	}

	componentWillUnmount() {
		this.audioMeter && this.audioMeter.dispose();
	}

	render() {
		return (
			<canvas ref="canvas" width="200" height="170" style={{
				width: '100%',
				height: 'auto',
			}}/>
		)
	}
}

AudioLevel.propTypes = {
	backgroundColor: PropTypes.string,
	stream: PropTypes.object,
	audioInputDevice: PropTypes.object,
};

export default AudioLevel;
