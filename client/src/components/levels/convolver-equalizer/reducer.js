import * as ActionTypes  from './actionTypes';
import * as cache from "../../oscillator/impulseCache";

const initialState = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    isGameStarted: false,
    isGameFinished: false,
    destFrequency: 380,
    destVolume: 0.2,
    destConvolver: 3,
    knobStartFrequency: 390,
    sliderStartVolume: 0.3,
    knobStartConvolver: 1,
    destOscillatorNode: {},
    destGainNode: {},
    destConvolverNode: {},
    equalizerOscillatorNode: {},
    equalizerGainNode: {},
    equalizerConvolverNode: {},
    isDestPlaying: false,
    isEqualizerPlaying: false,
    isTryAgain: false
};

export default function convolverEqualizerReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_CONVOLVER_EQUALIZER_GAME:
            return {
                ...state,
                isGameStarted: action.isGameStarted
            };

        case ActionTypes.FINISH_CONVOLVER_EQUALIZER_GAME:
            state.equalizerOscillatorNode.stop();
            state.destOscillatorNode.stop();

            return {
                ...state,
                isGameFinished: action.isGameFinished
            };

        case ActionTypes.ON_CONVOLVER_EQUALIZER_DEST_BUTTON_CLICK:
            return {
                ...state,
                isDestPlaying: !state.isDestPlaying
            };

        case ActionTypes.ON_CONVOLVER_EQUALIZER_KNOB_BUTTON_CLICK:
            return {
                ...state,
                isEqualizerPlaying: !state.isEqualizerPlaying
            };

        case ActionTypes.ON_CONVOLVER_EQUALIZER_TRY_AGAIN:
            return {
                ...state,
                isTryAgain: !state.isTryAgain
            };

        case ActionTypes.SET_CONVOLVER_EQUALIZER_DEST_OSCILLATOR_NODE: {
            const oscillatorNode = state.audioCtx.createOscillator();
            const gainNode = state.audioCtx.createGain();
            const convolverNode = state.audioCtx.createConvolver();

            oscillatorNode.type = 'square';
            oscillatorNode.frequency.setValueAtTime(action.frequency, state.audioCtx.currentTime);
            gainNode.gain.setValueAtTime(action.gain, state.audioCtx.currentTime);
            convolverNode.buffer = cache.getImpulse(action.destConvolver);

            oscillatorNode.start();

            return {
                ...state,
                destOscillatorNode: oscillatorNode,
                destGainNode: gainNode,
                destConvolverNode: convolverNode
            };
        }

        case ActionTypes.SET_CONVOLVER_EQUALIZER_KNOB_OSCILLATOR_NODE: {
            const oscillatorNode = state.audioCtx.createOscillator();
            const gainNode = state.audioCtx.createGain();
            const convolverNode = state.audioCtx.createConvolver();

            oscillatorNode.type = 'square';
            oscillatorNode.frequency.setValueAtTime(action.frequency, state.audioCtx.currentTime);
            gainNode.gain.setValueAtTime(action.gain, state.audioCtx.currentTime);
            convolverNode.buffer = cache.getImpulse(action.equalizerConvolverNode);

            oscillatorNode.start();

            return {
                ...state,
                equalizerOscillatorNode: oscillatorNode,
                equalizerGainNode: gainNode,
                equalizerConvolverNode: convolverNode
            };
        }

        default:
            return state;
    }
}

