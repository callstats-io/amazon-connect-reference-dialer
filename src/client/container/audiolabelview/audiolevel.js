import React from "react";
import {connect} from "react-redux";
import AudioMeter from './audiometer'
import PropTypes from "prop-types";


class AudioLevel extends React.Component {
	constructor(props) {
		super(props);
		this.width = 0;
		this.height = 0;

		this.audioMeter = new AudioMeter(props.backgroundColor);
	}

	shouldComponentUpdate(nextProps) {

		const {stream} = nextProps;
		if (!stream) {
			return true
		}
		// console.warn('<< ', 'shouldComponentUpdate', stream);
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(stream, canvasCtx, canvas, nextProps.backgroundColor);
		return true;
	}

	componentDidMount() {
		// console.warn('<< ', 'shouldComponentUpdate', this.props.stream);

		const {stream, backgroundColor} = this.props;
		if (!stream) {
			return true
		}

		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(stream, canvasCtx, canvas, backgroundColor);
		return true;
	}

	componentWillUnmount() {
		// console.warn('<<', 'componentWillUnmount');
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

AudioLevel.propTypes = {
	backgroundColor: PropTypes.string,
	stream: PropTypes.object,
};

export default AudioLevel;
