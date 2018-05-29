import * as ActionTypes from './actionTypes';
import shuffle from "shuffle-array";
import uuidV4 from 'uuid/v4';

const initialState = {
    /*audioCtx: new (window.AudioContext || window.webkitAudioContext)(),*/
    question: {text: 'What is the frequency range of a sound that a human ear can hear?'},
    answers: shuffle([
        {id: uuidV4(), text: '10 to 10,000 Hertz', isCorrect: false},
        {id: uuidV4(), text: '20 to 20,000 Hertz', isCorrect: true},
        {id: uuidV4(), text: '50 to 50,000 Hertz', isCorrect: false},
        {id: uuidV4(), text: '0 to 100,000 Hertz', isCorrect: false},
    ]),
    isGameStarted: false,
    isGameFinished: false
};

export default function multiChoiceGameReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_MULTI_CHOICE_GAME:
            return {
                ...state,
                isGameStarted: action.isGameStarted
            };

        case ActionTypes.ON_ANSWER_CLICK: {
            const selectedAnswer = state.answers.find(x => x.id === action.id);

            return {
                ...state,
                isGameFinished: selectedAnswer.isCorrect
            };
        }

        default:
            return state;
    }
}

