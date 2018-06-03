import * as ActionTypes  from './actionTypes';

const initialState = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    isGameStarted: false,
    isGameFinished: false,
    destFrequency: 400,
    knobStartFrequency: 420,
    destOscillatorNode: {},
    knobOscillatorNode: {},
    isDestPlaying: false,
    isKnobPlaying: false,
    isTryAgain: false
};

export default function pitchEqualizerReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_PITCH_EQUALIZER_GAME:
            return {
                ...state,
                isGameStarted: action.isGameStarted
            };

        case ActionTypes.FINISH_PITCH_EQUALIZER_GAME:
            state.knobOscillatorNode.stop();
            state.destOscillatorNode.stop();

            return {
                ...state,
                isGameFinished: action.isGameFinished
            };

        case ActionTypes.ON_DEST_PITCH_EQUALIZER_BUTTON_CLICK:
            return {
                ...state,
                isDestPlaying: !state.isDestPlaying
            };

        case ActionTypes.ON_PITCH_EQUALIZER_KNOB_BUTTON_CLICK:
            return {
                ...state,
                isKnobPlaying: !state.isKnobPlaying
            };

        case ActionTypes.ON_PITCH_EQUALIZER_TRY_AGAIN:
            return {
                ...state,
                isTryAgain: !state.isTryAgain
            };

        case ActionTypes.SET_DEST_PITCH_EQUALIZER_OSCILLATOR_NODE: {
            const oscillatorNode = state.audioCtx.createOscillator();

            oscillatorNode.type = 'square';
            oscillatorNode.frequency.setValueAtTime(action.frequency, state.audioCtx.currentTime); // value in hertz
            oscillatorNode.start();

            return {
                ...state,
                destOscillatorNode: oscillatorNode
            };
        }

        case ActionTypes.SET_KNOB_PITCH_EQUALIZER_OSCILLATOR_NODE: {
            const oscillatorNode = state.audioCtx.createOscillator();

            oscillatorNode.type = 'square';
            oscillatorNode.frequency.setValueAtTime(action.frequency, state.audioCtx.currentTime); // value in hertz
            oscillatorNode.start();

            return {
                ...state,
                knobOscillatorNode: oscillatorNode
            };
        }

        default:
            return state;
    }
}

