import React from 'react';

export default class PitchComponent extends React.Component {
    playPitch = () => {
        // create web audio api context
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // create Oscillator and gain node
        var oscillator = audioCtx.createOscillator();
        var gainNode = audioCtx.createGain();

        // connect oscillator to gain node to speakers
        oscillator.connect(gainNode);
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
        //oscillator.frequency.value = 440;
        gainNode.connect(audioCtx.destination);

        oscillator.start(0);
    }
}

render()
{
    return (
        <button className="pitch" onClick={this.playPitch}>
            Play
        </button>
    );
}
}