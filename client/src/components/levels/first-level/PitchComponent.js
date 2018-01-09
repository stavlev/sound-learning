import React from 'react';

export default class PitchComponent extends React.Component {
    constructor(props) {
        super(props);

        // create web audio api context
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        const oscillatorNode = audioCtx.createOscillator();

        oscillatorNode.type = 'square';
        oscillatorNode.frequency.setValueAtTime(/*this.state.frequency*/ 440, audioCtx.currentTime); // value in hertz
        oscillatorNode.start();

        this.state = {isPlaying: false, frequency: 440, oscillatorNode: oscillatorNode, audioCtx: audioCtx};
    }

    handleClick = () => {
        this.setState({isPlaying: !this.state.isPlaying}, () => this.handlePlay())
    };

    handlePlay = () => {
        if (!this.state.isPlaying) {
            this.state.oscillatorNode.disconnect(this.state.audioCtx.destination);
        }
        else {
            this.state.oscillatorNode.connect(this.state.audioCtx.destination);
        }
    }

    render() {
        return (
            <button className="pitch" onClick={() => this.handleClick()}>
                {this.state.isPlaying ? 'Stop' : 'Play'}
            </button>
        );
    }
}