import React from "react";
import AudioMeter from './audiometer'
import PropTypes from "prop-types";


class RemoteAudioLevel extends React.Component {
	constructor(props) {
		super(props);
		this.width = 0;
		this.height = 0;

		this.audioMeter = new AudioMeter();
	}

	shouldComponentUpdate(nextProps) {
		const {remoteStream} = nextProps;
		if (!remoteStream) {
			return true
		}
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(remoteStream, canvasCtx, canvas, nextProps.backgroundColor, nextProps.agentStateFn);
		return true;
	}

	componentDidMount() {
		const {remoteStream} = this.props;
		if (!remoteStream) {
			return;
		}
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(remoteStream, canvasCtx, canvas, this.props.backgroundColor, this.props.agentStateFn);
	}

	componentWillUnmount() {
		this.audioMeter && this.audioMeter.dispose();
	}

	render() {
		return (
			<canvas ref="canvas" width="200" height="100" style={{
				height: '15px',
				// border: '1px solid #000000',
				marginTop: '20%'
			}}/>
		)
	}
}

RemoteAudioLevel.propTypes = {
	remoteStream: PropTypes.object,
	agentStateFn: PropTypes.func,
};

export default RemoteAudioLevel;
