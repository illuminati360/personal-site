import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { interpolateTurbo } from 'd3-scale-chromatic';
import React from 'react';
import Empty from '../layouts/Empty';
import 'react-piano/dist/styles.css';

class Mic extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.canvas = React.createRef();

    this.state = {
      input: '',
      url: '',
      isListening: false,
    };
  }

  setListening = (value) => {
    this.setState({ isListening: value });
    if (this.state.isListening) {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then(stream => {
            const micStream = this.audio.audioCtx.createMediaStreamSource(stream);
            this.audio.connectInput(micStream);
          })
          .catch(err => {
            alert('Microphone access denied by user');
          });
      }
    } else {
      this.audio.disconnectInput();
    }
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  }

  handleClick = () => {
    const id = this.state.input;
    if (id == this.state.url) { return; }

    const MP3_BASE_URL = "https://www.illuminati360.xyz/youtube";
    const url = `${MP3_BASE_URL}/${id}`;
    this.setState({ url });
    this.video.current.setAttribute('src', url);
    this.video.current.load();
    this.video.current.play();
  }

  componentDidMount() {
    this.audio = new AudioMotionAnalyzer(this.container.current, {
      useCanvas: false,
      onCanvasDraw: (instance) => {
        this.drawCanvas(instance);
      },
    });
    const audioCtx = this.audio.audioCtx;
    this.oscillator = audioCtx.createOscillator();
    this.gainNode = audioCtx.createGain();
    this.gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    this.oscillator.start();

    this.oscillator.connect(this.gainNode); // connect oscillator -> gainNode
    this.audio.connectInput(this.gainNode); // connect gainNode -> audioMotion

    this.setListening(false);
  }

  drawCanvas = (instance) => {
    const canvas = this.canvas.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.fill();

    const bars = instance.getBars();
    const height = canvas.height / bars.length / 2;
    for (let i = 0; i < bars.length; i += 1) {
      this.drawLine(
        {
          y: (bars.length - i) * height,
          width: canvas.width,
          height: height / 2,
          value: bars[i].value[0],
        },
        ctx,
      );
      this.drawLine(
        {
          y: (bars.length - i) * height + (canvas.height / 2),
          width: canvas.width,
          height: height / 2,
          value: bars[i].value[1],
        },
        ctx,
      );
    }
  };

  drawLine = (opts, ctx) => {
    const {
      y,
      width,
      height,
      value,
    } = opts;

    // draw the bar
    const color = interpolateTurbo(value);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  };

  render() {
    return (
      <Empty>
        <div id="container" ref={this.container}>
          <div>
            <canvas id="canvas" ref={this.canvas} width="1880" height="720" />
          </div>
          <div id="controls">
            <button onClick={() => this.setListening(!this.state.isListening)}>{!this.state.isListening ? 'Turn Off Mic' : 'Turn On Mic'}</button>
          </div>
        </div>
      </Empty>
    );
  }
}

export default Mic;