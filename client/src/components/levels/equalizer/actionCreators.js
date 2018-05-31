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

export const onDestButtonClick = () => {
    return {
        type: ActionTypes.ON_DEST_BUTTON_CLICK
    };
};

export const onKnobButtonClick = () => {
    return {
        type: ActionTypes.ON_KNOB_BUTTON_CLICK
    };
};

export const onTryAgain = () => {
    return {
        type: ActionTypes.ON_TRY_AGAIN
    };
};

export const setDestOscillatorNode = (frequency) => {
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