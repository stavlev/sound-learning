import * as ActionTypes from './actionTypes';

export const startSortGame = () => {
    return {
        type: ActionTypes.START_SORT_GAME,
        isGameStarted: true
    };
};

export const onSortEnd = (frequencies) => {
    return {
        type: ActionTypes.SORT_END,
        frequencies: frequencies
    };
};

export const handleSortComponentClick = id => {
    return {
        type: ActionTypes.HANDLE_SORT_COMPONENT_CLICK,
        id: id
    };
};

export const setDefaultOscillatorNode = (id, frequency, level) => {
    return {
        type: ActionTypes.SET_DEFAULT_OSCILLATOR_NODE,
        id: id,
        frequency: frequency,
        level: level
    };
};

export const finishSortGame = () => {
    return {
        type: ActionTypes.FINISH_SORT_GAME,
        isGameFinished: true
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