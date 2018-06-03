import * as ActionTypes from './actionTypes';

export const startMultiChoiceGame = (url) => {
    return {
        type: ActionTypes.START_MULTI_CHOICE_GAME,
        isGameStarted: true,
        url: url
    };
};

export const onAnswerClick = id => {
    return {
        type: ActionTypes.ON_ANSWER_CLICK,
        id: id
    };
};

/*export const setDefaultOscillatorNode = (id, frequency) => {
    return {
        type: ActionTypes.SET_DEFAULT_OSCILLATOR_NODE,
        id: id,
        frequency: frequency
    };
};*/
