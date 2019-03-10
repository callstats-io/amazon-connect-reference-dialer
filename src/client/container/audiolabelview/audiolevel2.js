import React from "react";
import {connect} from "react-redux";
import AudioMeter from './audiometer'

class AudioLevel extends React.Component {
	constructor(props) {
		super(props);
		this.width = 0;
		this.height = 0;
		this.audioMeter = new AudioMeter();
	}

	shouldComponentUpdate(nextProps) {
		const {stream, isLocal} = nextProps;
		const audio = document.querySelector("#localAudio");
		audio.srcObject = stream;

		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		this.audioMeter.startVisualization(audio.srcObject, canvasCtx, canvas);
		return (this.props && this.props.stream && this.props.stream.id === stream.id) ? true : false;
	}

	componentDidMount() {
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
	}

	componentWillUnmount() {
		this.audioMeter && this.audioMeter.dispose();
	}

	render() {
		return (
			<div>
				<canvas ref="canvas" width="200" height="170" style={{
					backgroundColor: '#ffffff',
					width: '100%',
					height: 'auto',
				}}/>
				<audio id="localAudio" muted controls width="160" height="120" autoPlay
					   style={{display: 'none'}}></audio>
			</div>

		)
	}
}

AudioLevel.propTypes = {};
const mapStateToProps = state => ({
	stream: state.acReducer.stream,
	isLocal: state.acReducer.isLocal,
});
const mapDispatchToProps = dispatch => ({});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AudioLevel);
