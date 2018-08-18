import * as ActionTypes  from './actionTypes';
import shuffle from "shuffle-array";
import uuidV4 from 'uuid/v4';

const randomMaterialColor = require('random-material-color');

const initialState = {
    audioCtx: new (window.AudioContext || window.webkitAudioContext)(),
    frequencies: shuffle([
        {id: uuidV4(), frequency: 1, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 2, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 3, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 4, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 5, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 6, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}},
        {id: uuidV4(), frequency: 7, color: randomMaterialColor.getColor(), isPlaying: false, oscillatorNode: {}}
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
            let oscillatorNode = state.audioCtx.createOscillator();
            let tmposcillatorNode;
            let gainNode = null;
            let isLoudness = 0;
            let isWaveLength = 0;
            let currTime = 0;

            oscillatorNode.type = 'sine';

            if (action.level === 2) {
                oscillatorNode.frequency.setValueAtTime(440, state.audioCtx.currentTime);
            }
            else if (action.level === 4){
                currTime = state.audioCtx.currentTime;
                oscillatorNode.frequency.setValueAtTime(2000, currTime);
                for (let i = 1; i <= 100; i = i + 2) {
                    oscillatorNode.frequency.linearRampToValueAtTime(100, currTime + (action.frequency * i));
                    oscillatorNode.frequency.linearRampToValueAtTime(2000, currTime + (action.frequency * i) + 1);
                }
                isWaveLength = 1;
            }
            else {
                oscillatorNode.frequency.setValueAtTime(action.frequency * 100 + 140, state.audioCtx.currentTime);
            }

            if (action.level === 2) {
                gainNode = state.audioCtx.createGain();
                gainNode.gain.value = action.frequency * 0.15;
                isLoudness = 1;
            }


            if (isLoudness === 1){
                oscillatorNode.connect(gainNode);
                tmposcillatorNode = oscillatorNode;
                oscillatorNode = gainNode;
                tmposcillatorNode.start();
            }
            else if (isWaveLength === 1){
                oscillatorNode.start();
            }
            else{
                oscillatorNode.start();
            }

            //oscillatorNode.frequency.setValueAtTime(action.frequency * 100 + 140, state.audioCtx.currentTime);
            //oscillatorNode.start();



            return {
                ...state,
                frequencies: state.frequencies.map(freq =>
                    (freq.id === action.id)
                        ? {...freq, oscillatorNode: oscillatorNode} : freq
                )
            };
        }

        case ActionTypes.RESET_LEVELS: {
            return {
                ...state,
                isGameStarted: false,
                isGameFinished: false,
            }
        }

        default:
            return state;
    }
}

