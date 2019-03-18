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
		this.audioMeter.startVisualization(remoteStream, canvasCtx, canvas);
		return true;
	}

	componentDidMount() {
		const {remoteStream} = this.props;
		if (!remoteStream) {
			return;
		}
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(remoteStream, canvasCtx, canvas);
	}

	componentWillUnmount() {
		this.audioMeter && this.audioMeter.dispose();
	}

	render() {
		return (
			<div>
				<canvas ref="canvas" width="200" height="170" style={{
					width: '100%',
					height: 'auto',
				}}/>
			</div>

		)
	}
}

RemoteAudioLevel.propTypes = {
	remoteStream: PropTypes.object,
};

export default RemoteAudioLevel;
