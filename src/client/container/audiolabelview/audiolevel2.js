import React from "react";
import {connect} from "react-redux";
import AudioMeter from './audiometer'
import PropTypes from "prop-types";

class AudioLevel extends React.Component {
	constructor(props) {
		super(props);
		this.width = 0;
		this.height = 0;
		this.audioMeter = new AudioMeter();
	}

	shouldComponentUpdate(nextProps) {
		const {stream, isLocal} = nextProps;
		console.warn('>>>', 'shouldComponentUpdate ', stream, isLocal, nextProps);
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");

		this.audioMeter.startVisualization(stream, canvasCtx, canvas);
		return (this.props && this.props.stream && this.props.stream.id === stream.id) ? true : false;
	}

	componentDidMount() {
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext("2d");
		// this.audioMeter
	}

	componentWillUnmount() {
		console.warn('->', 'componentWillUnmount');
		this.audioMeter && this.audioMeter.dispose();
	}

	render() {
		return (
			<canvas ref="canvas" width="200" height="170" style={{
				backgroundColor: '#ffffff',
				width: '100%',
				height: 'auto',
			}}/>
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
