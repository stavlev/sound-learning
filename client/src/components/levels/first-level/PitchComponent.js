import React from 'react';

export default class PitchComponent extends React.Component {
    playPitch = () => {
        // create web audio api context
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // create Oscillator node
        const oscillator = audioCtx.createOscillator();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
        oscillator.connect(audioCtx.destination);
        oscillator.start();
    }

    render() {
        return (
        <button className="pitch" onClick={() => this.playPitch}>
            PLAY
        </button>
        )
    }


}