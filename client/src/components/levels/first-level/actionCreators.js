import * as ActionTypes from './actionTypes';

export const startGame = () => {
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

export const setDefaultOscillatorNode = (id, frequency) => {
    return {
        type: ActionTypes.SET_DEFAULT_OSCILLATOR_NODE,
        id: id,
        frequency: frequency
    };
};

export const finishSortGame = () => {
    return {
        type: ActionTypes.FINISH_SORT_GAME,
        isGameFinished: true
    };
};

