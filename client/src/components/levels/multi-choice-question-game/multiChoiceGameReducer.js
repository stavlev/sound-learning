import * as ActionTypes from './actionTypes';
import shuffle from "shuffle-array";
import uuidV4 from 'uuid/v4';
import {detectLevel} from "../../../helper_functions/levelDetector";
import {QUESTION_FOUR, QUESTION_ONE, QUESTION_TWO} from "../../../constants/questionsAnswers";

const initialState = {
    /*audioCtx: new (window.AudioContext || window.webkitAudioContext)(),*/
    question: {text: 'What is the frequency range of a sound that a human ear can hear?'},
    answers: shuffle([
        {id: uuidV4(), text: '10 to 10,000 Hertz', isCorrect: false, wasSelected: false},
        {id: uuidV4(), text: '20 to 20,000 Hertz', isCorrect: true, wasSelected: false},
        {id: uuidV4(), text: '50 to 50,000 Hertz', isCorrect: false, wasSelected: false},
        {id: uuidV4(), text: '0 to 100,000 Hertz', isCorrect: false, wasSelected: false},
    ]),
    isGameStarted: false,
    isGameFinished: false
};

export default function multiChoiceGameReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_MULTI_CHOICE_GAME: {

            let level = detectLevel(action.url);
            let questionTmp;
            let answersTmp;

            switch (level[0]) {
                case 1: {
                    questionTmp = QUESTION_ONE.question;
                    answersTmp = QUESTION_ONE.answers;
                    break;
                }
                case 2: {
                    questionTmp = QUESTION_TWO.question;
                    answersTmp = QUESTION_TWO.answers;
                    break;
                }
                case 4: {
                    questionTmp = QUESTION_FOUR.question;
                    answersTmp = QUESTION_FOUR.answers;
                    break;
                }
                default: {
                    questionTmp = QUESTION_ONE.question;
                    answersTmp = QUESTION_ONE.answers;
                    break;
                }
            }

            return {
                ...state,
                isGameStarted: action.isGameStarted,
                question: questionTmp,
                answers: answersTmp,
            };
        }

        case ActionTypes.ON_ANSWER_CLICK: {
            const selectedAnswer = state.answers.find(x => x.id === action.id);

            const indexOfSelectedAnswer = state.answers.indexOf(selectedAnswer);

            return {
                ...state,
                isGameFinished: selectedAnswer.isCorrect,
                answers: [
                    ...state.answers.slice(0, indexOfSelectedAnswer),
                    {
                        ...selectedAnswer,
                        wasSelected: true
                    },
                    ...state.answers.slice(indexOfSelectedAnswer + 1)
                ],
            };
        }

        case ActionTypes.RESET_LEVELS: {
            return {
                ...state,
                isGameStarted: false,
                isGameFinished: false,
            }
        }

        default:
            return state;
    }
}

