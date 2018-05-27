import * as ActionTypes from "./actionTypes";

export const startGame = () => {
    return {
        type: ActionTypes.START_GAME,
        isGameStarted: true
    };
};

export const finishGame = () => {
    return {
        type: ActionTypes.FINISH_GAME,
        isGameFinished: true
    };
};

export const setDestOscillatorNode = (id, frequency) => {
    return {
        type: ActionTypes.SET_DEST_OSCILLATOR_NODE,
        frequency: frequency
    };
};

export const setKnobOscillatorNode = (frequency) => {
    return {
        type: ActionTypes.SET_KNOB_OSCILLATOR_NODE,
        frequency: frequency
    };
};