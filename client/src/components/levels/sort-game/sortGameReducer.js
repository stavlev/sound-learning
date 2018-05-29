import * as ActionTypes  from './actionTypes';
import shuffle from "shuffle-array";
import uuidV4 from 'uuid/v4';

const randomMaterialColor = require('random-material-color');

const initialState = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    frequencies: shuffle([
        {id: uuidV4(), frequency: 240, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 340, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 440, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 540, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 640, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 740, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 840, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}}
    ]),
    isGameStarted: false,
    isGameFinished: false
};

export default function sortGameReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_SORT_GAME:
            return {
                ...state,
                isGameStarted: action.isGameStarted
            };

        case ActionTypes.FINISH_SORT_GAME:
            return {
                ...state,
                isGameFinished: action.isGameFinished
            };

        case ActionTypes.SORT_END:
            return {
                ...state,
                frequencies: action.frequencies
            };

        case ActionTypes.HANDLE_SORT_COMPONENT_CLICK:
            return {
                ...state,
                frequencies: state.frequencies.map(freq =>
                    (freq.id === action.id)
                        ? {...freq, isPlaying: !freq.isPlaying}
                        : freq
                )
            };

        case ActionTypes.SET_DEFAULT_OSCILLATOR_NODE: {
            const oscillatorNode = state.audioCtx.createOscillator();

            oscillatorNode.type = 'square';
            oscillatorNode.frequency.setValueAtTime(action.frequency, state.audioCtx.currentTime); // value in hertz
            oscillatorNode.start();

            return {
                ...state,
                frequencies: state.frequencies.map(freq =>
                    (freq.id === action.id)
                        ? {...freq, oscillatorNode: oscillatorNode} : freq
                )
            };
        }

        default:
            return state;
    }
}

