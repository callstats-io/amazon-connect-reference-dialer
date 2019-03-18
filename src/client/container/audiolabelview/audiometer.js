import agentStateManager from './../../api/agentStateManager';
import {getColorSchema} from './../../utils/agetStateMap';

class AudioMeter {
	constructor() {
		this.id = undefined;
		this.source = undefined;
	}

	startVisualization(stream, canvasCtx, canvas, backgroundColor = undefined) {
		let audioCtx = new AudioContext();
		let analyser = audioCtx.createAnalyser();
		this.source = audioCtx.createMediaStreamSource(stream);
		this.source.connect(analyser);

		if (this.id) {
			window.cancelAnimationFrame(this.id);
		}

		let data = new Uint8Array(canvas.width);
		canvasCtx.strokeStyle = '#cfcfcf';
		const colors = ['rgb(192,192,192)', 'rgb((0,128,0))', 'rgb((0,0,128))', 'rgb((173,216,230))', 'rgb((255,250,205))'];
		const len = colors.length;
		const draw = () => {
			canvasCtx.fillStyle = backgroundColor || getColorSchema(agentStateManager.getAgentLocalState());
			canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

			// analyser.getByteFrequencyData(data);
			// canvasCtx.lineWidth = 2;
			// data.forEach((y, x) => {
			// 	y = canvas.height - (y / 128) * canvas.height / 4;
			// 	canvasCtx.fillStyle = colors[Math.floor(Math.random() * 100) % len];
			// 	canvasCtx.fillRect(x, y, 2, canvas.height - y)
			// });

			analyser.getByteTimeDomainData(data);
			canvasCtx.lineWidth = 5;
			canvasCtx.beginPath();
			data.forEach((y, x) => {
				y = canvas.height - (y / 128) * canvas.height / 2;
				x ? canvasCtx.lineTo(x, y) : canvasCtx.moveTo(x, y);
			});
			canvasCtx.stroke();
			this.id = window.requestAnimationFrame(draw);
		};
		this.id = window.requestAnimationFrame(draw)
	}

	dispose() {
		if (this.id) {
			window.cancelAnimationFrame(this.id);
			this.id = undefined;
		}
	}
}

export default AudioMeter;
