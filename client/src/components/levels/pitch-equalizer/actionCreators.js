import * as ActionTypes from "./actionTypes";

export const startGame = () => {
    return {
        type: ActionTypes.START_PITCH_EQUALIZER_GAME,
        isGameStarted: true
    };
};

export const finishGame = () => {
    return {
        type: ActionTypes.FINISH_PITCH_EQUALIZER_GAME,
        isGameFinished: true
    };
};

export const onDestButtonClick = () => {
    return {
        type: ActionTypes.ON_DEST_PITCH_EQUALIZER_BUTTON_CLICK
    };
};

export const onKnobButtonClick = () => {
    return {
        type: ActionTypes.ON_PITCH_EQUALIZER_KNOB_BUTTON_CLICK
    };
};

export const onTryAgain = () => {
    return {
        type: ActionTypes.ON_PITCH_EQUALIZER_TRY_AGAIN
    };
};

export const setDestPitchOscillatorNode = (frequency) => {
    return {
        type: ActionTypes.SET_DEST_PITCH_EQUALIZER_OSCILLATOR_NODE,
        frequency: frequency
    };
};

export const setKnobOscillatorNode = (frequency) => {
    return {
        type: ActionTypes.SET_KNOB_PITCH_EQUALIZER_OSCILLATOR_NODE,
        frequency: frequency
    };
};

export const updateLevels = (level, subLevel) => {
    return {
        type: ActionTypes.UPDATE_LEVELS,
        level: level,
        subLevel: subLevel
    };
};

export const onSetdbUser = (dbUser) => {
    return {
        type: ActionTypes.DB_USER_SET,
        dbUser: dbUser
    };
};