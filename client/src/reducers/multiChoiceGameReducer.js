import * as ActionTypes from '../components/levels/multi-choice-question-game/actionTypes';
import shuffle from "shuffle-array";
import uuidV4 from 'uuid/v4';

const initialState = {
    /*audioCtx: new (window.AudioContext || window.webkitAudioContext)(),*/
    question: {text: 'Is this the real life, or is it just fantasy?'},
    answers: shuffle([
        {id: uuidV4(), text: 'Answer 1', isCorrect: false},
        {id: uuidV4(), text: 'Answer 2', isCorrect: true},
        {id: uuidV4(), text: 'Answer 3', isCorrect: false},
        {id: uuidV4(), text: 'Answer 4', isCorrect: false},
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

