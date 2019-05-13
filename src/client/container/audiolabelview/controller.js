/*
2c6873
f2be45
ef8336
eb4358
51b1ca
*/

const range = 60;
const interval = range / 6;
const sensitivity = 2;
const min = 10;
const max = 480;

class AudioFrequencyMonitor {
  constructor () {
    this.id = undefined;
    this.frequencyBar = [];
    this.agentStateFn = undefined;

    // audio
    this.context = undefined;
    this.analyser = undefined;
    this.sourceNode = undefined;
  }

  register (bars = [], agentStateFn = undefined) {
    this.frequencyBar = bars;
    this.agentStateFn = agentStateFn;
  }

  visualize (analyser = undefined) {
    let data = new Uint8Array(analyser.frequencyBinCount);

    const render = () => {
      if (analyser) {
        analyser.getByteFrequencyData(data);
        for (let channel = 1; channel < this.frequencyBar.length; channel += 1) {
          const to = Math.floor(interval * channel);
          const from = Math.ceil(to - interval);
          const segment = data.slice(from, to);
          const sum = segment.reduce((a, b) => a + b);

          const average = sum / segment.length;
          let height = sensitivity * average;
          let translateY = -average * 0.8;

          // scale down first and last channels to achieve an 'eyes' aesthetic
          if (channel === 1 || channel === this.frequencyBar.length) {
            translateY *= 0.2;
            height *= 0.2;
          }

          height = Math.max(min, Math.min(max, height));
          let bar = this.frequencyBar[channel];
          // louder frequencies render with a greater height
          bar.setAttribute(
            'd',
            `m 0,0 h -11.941 c -14.938,0 -27.048,12.11 -27.048,27.048 v ${height} c 0,14.938 12.11,27.048 27.048,27.048 H 0 c 14.938,0 27.048,-12.11 27.048,-27.048 V 27.048 C 27.048,12.11 14.938,0 0,0`
          );
          // louder frequencies are shifted down further
          bar.setAttribute('transform', `translate(0, ${translateY})`);
        }
      }
      this.id = window.requestAnimationFrame(render);
    };
    render();
  }

  renderStream (stream = undefined) {
    // clear animation
    this.dispose().then(_ => {
      if (!stream) {
        return;
      }
      this.context = new AudioContext();
      this.analyser = this.context.createAnalyser();
      this.analyser.fftSize = 1024;

      this.sourceNode = this.context.createMediaStreamSource(stream);
      this.sourceNode.connect(this.analyser);
      this.visualize(this.analyser);
    }).catch(err => {
      console.error('~', err);
    });
  }

  async dispose () {
    // console.warn('~audiolabel.controller.dispose');
    if (this.id) {
      window.cancelAnimationFrame(this.id);
      this.id = null;
    }
    if (this.context) {
      await this.context.close();
      this.context = undefined;
      this.analyser = undefined;
    }

    this.sourceNode = undefined;
  }
}

export default AudioFrequencyMonitor;
