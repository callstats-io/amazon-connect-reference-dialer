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

	/*shouldComponentUpdate(nextProps) {

		const {stream} = nextProps;
		if (!stream) {
			return false
		}

		const audio = document.querySelector("#localAudio");
		audio.srcObject = stream;

		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(audio.srcObject, canvasCtx, canvas, nextProps.backgroundColor);
		return (this.props && this.props.stream && this.props.stream.id === stream.id) ? true : false;
	}*/

	componentDidMount() {
		console.warn('<<', 'shouldComporefnentUpdate');
	}

	componentWillUnmount() {
		console.warn('<<', 'componentWillUnmount');
		this.audioMeter && this.audioMeter.dispose();
	}

	_renderStream(stream, backgroundColor) {
		if (!stream) {
			return;
		}
		if (!this.refs) {
			return;
		}

		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(stream, canvasCtx, canvas, backgroundColor);
	}

	render() {
		const {stream, backgroundColor} = this.props;
		this._renderStream(stream, backgroundColor);
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
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AudioLevel);
