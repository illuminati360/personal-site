import AudioMotionAnalyzer from 'audiomotion-analyzer';
import { interpolateTurbo } from 'd3-scale-chromatic';
import React from 'react';
import Empty from '../layouts/Empty';
import { Piano, MidiNumbers, KeyboardShortcuts } from "react-piano";
import 'react-piano/dist/styles.css';

class Audio extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.video = React.createRef();
    this.source = React.createRef();
    this.canvas = React.createRef();
    this.piano = React.createRef();
    this.song = [
      [65],
      [69],
      [71],
      [],
      [65],
      [69],
      [71],
      [],
      [65],
      [69],
      [71],
      [76],
      [74],
      [],
      [71],
      [72],
      [71],
      [67],
      [64],
      [],
      [],
      [],
      [],
      [62],
      [64],
      [67],
      [64],
      [],
      [],
      [],
      [],
      [],
    ];
    this.song = [
      [70 + 12],
      [],
      [],
      [],
      [72 + 12],
      [],
      [],
      [],
      [68 + 12],
      [],
      [],
      [],
      [60 + 12],
      [],
      [],
      [],
      [63 + 12],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
      [],
    ];

    this.state = {
      input: '',
      url: '',
      activeNotesIndex: 0,
      isPlaying: false,
      stopAllNotes: () => {
        const audioCtx = this.audio.audioCtx;
        this.gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
      },
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isPlaying !== this.state.isPlaying) {
      if (this.state.isPlaying) {
        this.playbackIntervalFn = setInterval(() => {
          this.setState({
            activeNotesIndex: (this.state.activeNotesIndex + 1) % this.song.length,
          });
        }, 200);
      } else {
        clearInterval(this.playbackIntervalFn);
        this.state.stopAllNotes();
        this.setState({
          activeNotesIndex: 0,
        });
      }
    }
  }

  setPlaying = (value) => {
    this.setState({ isPlaying: value });
  };

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
      source: this.video.current,
      useCanvas: false,
      stereo: true,
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
          energy: this.audio.getEnergy('bass'),
        },
        ctx,
      );
      this.drawLine(
        {
          y: (bars.length - i) * height + (canvas.height / 2),
          width: canvas.width,
          height: height / 2,
          value: bars[i].value[1],
          energy: this.audio.getEnergy('bass'),
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
      energy,
    } = opts;

    // draw the bar
    const color = interpolateTurbo(value);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = height;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width/3, y);
    ctx.moveTo(0, y);
    ctx.lineTo(width/3, y);
    ctx.moveTo(0, y);
    ctx.lineTo(width/3, y);
    ctx.stroke();

    const fft = `rgb(${value*255},${value*255},${value*255})`;
    ctx.strokeStyle = fft;
    ctx.fillStyle = fft;
    ctx.lineWidth = height;
    ctx.beginPath();
    ctx.moveTo(width/3*1, y);
    ctx.lineTo(width/3*2, y);
    ctx.moveTo(width/3*1, y);
    ctx.lineTo(width/3*2, y);
    ctx.moveTo(width/3*1, y);
    ctx.lineTo(width/3*2, y);
    ctx.stroke();

    const bass = `rgb(${energy*255},${energy*255},${energy*255})`;
    ctx.strokeStyle = bass;
    ctx.fillStyle = bass;
    ctx.lineWidth = height;
    ctx.beginPath();
    ctx.moveTo(width/3*2, y);
    ctx.lineTo(width, y);
    ctx.moveTo(width/3*2, y);
    ctx.lineTo(width, y);
    ctx.moveTo(width/3*2, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  };

  noteToFreq = (note) => {
    let a = 440; //frequency of A (coomon value is 440Hz)
    return (a / 32) * (2 ** ((note - 9) / 12));
  }

  playNote = (midiNumber) => {
    const audioCtx = this.audio.audioCtx;
    if (midiNumber !== undefined) {
      const freq = this.noteToFreq(midiNumber);
      this.oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);
      this.gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    }
  }

  mouseUp = () => {
    const audioCtx = this.audio.audioCtx;
    this.gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
  }

  render() {
    const firstNote = MidiNumbers.fromNote('c3');
    const lastNote = MidiNumbers.fromNote('f8');
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: firstNote,
      lastNote: lastNote,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });

    return (
      <Empty>
        <div id="container" ref={this.container}>
          <div style={({ display: "flex", justifyContent: "space-between" })}>
            <input type="text" placeholder="Youtube Video ID" onChange={this.handleChange}></input>
            <button onClick={this.handleClick}>Submit</button>
          </div>
          <div>
            <video id="video" ref={this.video} controls width="1280" height="720">
              <source src="https://www.illuminati360.xyz/youtube/Nux83O6t9GY" ref={this.video} type="video/mp4" />
              <track src="" kind="captions" srcLang="en" label="english_captions" ref={this.source} />
            </video>
            <canvas id="canvas" ref={this.canvas} width="600" height="720" />
          </div>
          <div id="piano" onMouseUp={this.mouseUp}>
            <Piano
              activeNotes={
                this.state.isPlaying ? this.song[this.state.activeNotesIndex] : []
              }
              noteRange={{ first: firstNote, last: lastNote }}
              playNote={(midiNumber) => {
                this.playNote(midiNumber);
              }}
              stopNote={(midiNumber) => {
              }}
              width={1880}
              keyboardShortcuts={keyboardShortcuts}
              ref={this.piano}
            />
          </div>
          <div id="controls">
            <button onClick={() => this.setPlaying(!this.state.isPlaying)}>{this.state.isPlaying ? 'Stop' : 'Start'}</button>
          </div>
        </div>
      </Empty>
    );
  }
}

export default Audio;
