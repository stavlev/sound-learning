import * as ActionTypes  from './actionTypes';

const initialState = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    isGameStarted: false,
    isGameFinished: false,
    destFrequency: 350,
    destVolume: 0.6,
    knobStartFrequency: 410,
    sliderStartVolume: 0.3,
    destOscillatorNode: {},
    destGainNode: {},
    equalizerOscillatorNode: {},
    equalizerGainNode: {},
    isDestPlaying: false,
    isEqualizerPlaying: false,
    isTryAgain: false
};

export default function loudnessEqualizerReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_LOUDNESS_EQUALIZER_GAME:
            return {
                ...state,
                isGameStarted: action.isGameStarted
            };

        case ActionTypes.FINISH_LOUDNESS_EQUALIZER_GAME:
            state.equalizerOscillatorNode.stop();
            state.destOscillatorNode.stop();

            return {
                ...state,
                isGameFinished: action.isGameFinished
            };

        case ActionTypes.ON_LOUDNESS_EQUALIZER_DEST_BUTTON_CLICK:
            return {
                ...state,
                isDestPlaying: !state.isDestPlaying
            };

        case ActionTypes.ON_LOUDNESS_EQUALIZER_KNOB_BUTTON_CLICK:
            return {
                ...state,
                isEqualizerPlaying: !state.isEqualizerPlaying
            };

        case ActionTypes.ON_LOUDNESS_EQUALIZER_TRY_AGAIN:
            return {
                ...state,
                isTryAgain: !state.isTryAgain
            };

        case ActionTypes.SET_LOUDNESS_EQUALIZER_DEST_OSCILLATOR_NODE: {
            const oscillatorNode = state.audioCtx.createOscillator();
            const gainNode = state.audioCtx.createGain();

            oscillatorNode.type = 'square';
            oscillatorNode.frequency.setValueAtTime(action.frequency, state.audioCtx.currentTime);
            gainNode.gain.setValueAtTime(action.gain, state.audioCtx.currentTime);
            oscillatorNode.start();

            return {
                ...state,
                destOscillatorNode: oscillatorNode,
                destGainNode: gainNode
            };
        }

        case ActionTypes.SET_LOUDNESS_EQUALIZER_KNOB_OSCILLATOR_NODE: {
            const oscillatorNode = state.audioCtx.createOscillator();
            const gainNode = state.audioCtx.createGain();

            oscillatorNode.type = 'square';
            oscillatorNode.frequency.setValueAtTime(action.frequency, state.audioCtx.currentTime);
            gainNode.gain.setValueAtTime(action.gain, state.audioCtx.currentTime);
            oscillatorNode.start();

            return {
                ...state,
                equalizerOscillatorNode: oscillatorNode,
                equalizerGainNode: gainNode
            };
        }

        default:
            return state;
    }
}

