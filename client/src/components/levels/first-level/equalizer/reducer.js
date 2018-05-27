import * as ActionTypes  from './actionTypes';

const initialState = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    isGameStarted: false,
    isGameFinished: false,
    destFrequency: 0,
    knobStartFrequency: 0,
    destOscillatorNode: {},
    knobOscillatorNode: {}
};

export default function pitchEqualizerReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_GAME:
            return {
                ...state,
                isGameStarted: action.isGameStarted
            };

        case ActionTypes.FINISH_GAME:
            return {
                ...state,
                isGameFinished: action.isGameFinished
            };

        case ActionTypes.SET_DEST_OSCILLATOR_NODE: {
            const oscillatorNode = state.audioCtx.createOscillator();

            oscillatorNode.type = 'square';
            oscillatorNode.frequency.setValueAtTime(action.frequency, state.audioCtx.currentTime); // value in hertz
            oscillatorNode.start();

            return {
                ...state,
                destOscillatorNode: oscillatorNode
            };
        }

        case ActionTypes.SET_KNOB_OSCILLATOR_NODE: {
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

