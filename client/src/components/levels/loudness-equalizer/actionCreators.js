import * as ActionTypes from "./actionTypes";

export const startGame = () => {
    return {
        type: ActionTypes.START_LOUDNESS_EQUALIZER_GAME,
        isGameStarted: true
    };
};

export const finishGame = () => {
    return {
        type: ActionTypes.FINISH_LOUDNESS_EQUALIZER_GAME,
        isGameFinished: true
    };
};

export const onDestButtonClick = () => {
    return {
        type: ActionTypes.ON_LOUDNESS_EQUALIZER_DEST_BUTTON_CLICK
    };
};

export const onEqualizerButtonClick = () => {
    return {
        type: ActionTypes.ON_LOUDNESS_EQUALIZER_KNOB_BUTTON_CLICK
    };
};

export const onTryAgain = () => {
    return {
        type: ActionTypes.ON_LOUDNESS_EQUALIZER_TRY_AGAIN
    };
};

export const setDestOscillatorNode = (frequency, gain) => {
    return {
        type: ActionTypes.SET_LOUDNESS_EQUALIZER_DEST_OSCILLATOR_NODE,
        frequency: frequency,
        gain: gain
    };
};

export const setEqualizerOscillatorNode = (frequency, gain) => {
    return {
        type: ActionTypes.SET_LOUDNESS_EQUALIZER_KNOB_OSCILLATOR_NODE,
        frequency: frequency,
        gain: gain
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