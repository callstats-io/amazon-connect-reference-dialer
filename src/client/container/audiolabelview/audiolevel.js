import React from "react";
import AudioMeter from './audiometer'
import PropTypes from "prop-types";

const isSame = (inputDevice = undefined, prvInputDevice = undefined) => {
	return (inputDevice && inputDevice.groupId) === (prvInputDevice && prvInputDevice.groupId);
};

class AudioLevel extends React.Component {
	constructor(props) {
		super(props);
		this.audioInputDevice = undefined;
		this.audioMeter = new AudioMeter();
	}

	shouldComponentUpdate(nextProps) {
		const {stream, audioInputDevice} = nextProps;
		const same = isSame(audioInputDevice, this.props.audioInputDevice);
		if (same) {
			return false;
		}
		// dispose previous audio source if there is any
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(stream, canvasCtx, canvas, nextProps.backgroundColor);
		return true;
	}

	componentDidMount() {
		const same = isSame(this.audioInputDevice, this.props.audioInputDevice);
		if (same) {
			return;
		}
		this.audioInputDevice = this.props.audioInputDevice;
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(this.props.stream, canvasCtx, canvas, this.props.backgroundColor);
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
	stream: PropTypes.object,
	audioInputDevice: PropTypes.object,
	backgroundColor: PropTypes.string,
};

export default AudioLevel;
