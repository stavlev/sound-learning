import * as ActionTypes from "./actionTypes";

export const startGame = () => {
    return {
        type: ActionTypes.START_CONVOLVER_EQUALIZER_GAME,
        isGameStarted: true
    };
};

export const finishGame = () => {
    return {
        type: ActionTypes.FINISH_CONVOLVER_EQUALIZER_GAME,
        isGameFinished: true
    };
};

export const onDestButtonClick = () => {
    return {
        type: ActionTypes.ON_CONVOLVER_EQUALIZER_DEST_BUTTON_CLICK
    };
};

export const onEqualizerButtonClick = () => {
    return {
        type: ActionTypes.ON_CONVOLVER_EQUALIZER_KNOB_BUTTON_CLICK
    };
};

export const onTryAgain = () => {
    return {
        type: ActionTypes.ON_CONVOLVER_EQUALIZER_TRY_AGAIN
    };
};

export const setDestOscillatorNode = (frequency, gain, convolver) => {
    return {
        type: ActionTypes.SET_CONVOLVER_EQUALIZER_DEST_OSCILLATOR_NODE,
        frequency: frequency,
        gain: gain,
        destConvolver: convolver
    };
};

export const setEqualizerOscillatorNode = (frequency, gain, convolver) => {
    return {
        type: ActionTypes.SET_CONVOLVER_EQUALIZER_KNOB_OSCILLATOR_NODE,
        frequency: frequency,
        gain: gain,
        knobConvolver: convolver
    };
};