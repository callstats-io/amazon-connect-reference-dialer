import agentMediaManager from './../../api/agentMediaManager'

class AudioMeter {
	constructor(backgroundColor = '#ffffff') {
		this.intervalId = undefined;
		this.backgroundColor = backgroundColor;
	}

	startVisualization(stream, canvasCtx, canvas) {
		var audioCtx = new AudioContext();
		var analyser = audioCtx.createAnalyser();
		var source = audioCtx.createMediaStreamSource(stream);
		source.connect(analyser);

		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = undefined;
		}

		let data = new Uint8Array(canvas.width);
		canvasCtx.strokeStyle = '#cfcfcf';
		const colors = ['rgb(192,192,192)', 'rgb((0,128,0))', 'rgb((0,0,128))', 'rgb((173,216,230))', 'rgb((255,250,205))'];
		const len = colors.length;
		const draw = () => {
			canvasCtx.fillStyle = this.backgroundColor;
			canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

			analyser.getByteFrequencyData(data);
			canvasCtx.lineWidth = 2;
			data.forEach((y, x) => {
				y = canvas.height - (y / 128) * canvas.height / 4;
				canvasCtx.fillStyle = colors[Math.floor(Math.random() * 100) % len];
				canvasCtx.fillRect(x, y, 2, canvas.height - y)
			});

			analyser.getByteTimeDomainData(data);
			canvasCtx.lineWidth = 5;
			canvasCtx.beginPath();
			data.forEach((y, x) => {
				y = canvas.height - (y / 128) * canvas.height / 2;
				x ? canvasCtx.lineTo(x, y) : canvasCtx.moveTo(x, y);
			});
			canvasCtx.stroke();
		};
		this.intervalId = setInterval(() => {
			draw()
		}, 1000 * canvas.width / audioCtx.sampleRate)
	}

	dispose() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
			this.intervalId = undefined;
		}
		agentMediaManager.dispose();
	}
}

export default AudioMeter;
