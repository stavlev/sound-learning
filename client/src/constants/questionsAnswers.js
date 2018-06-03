import uuidV4 from 'uuid/v4';
import shuffle from "shuffle-array";

export const QUESTION_ONE = {
    question: {text: 'What is the frequency range of a sound that a human ear can hear?'},
    answers: shuffle([
        {id: uuidV4(), text: '10 to 10,000 Hertz', isCorrect: false},
        {id: uuidV4(), text: '20 to 20,000 Hertz', isCorrect: true},
        {id: uuidV4(), text: '50 to 50,000 Hertz', isCorrect: false},
        {id: uuidV4(), text: '0 to 100,000 Hertz', isCorrect: false},
    ]),
};

export const QUESTION_TWO = {
    question: {text: 'At what decibels does a loud sound becomes dangerous?'},
    answers: shuffle([
        {id: uuidV4(), text: '100 decibels', isCorrect: false},
        {id: uuidV4(), text: '120 decibels', isCorrect: true},
        {id: uuidV4(), text: '80 decibels', isCorrect: false},
        {id: uuidV4(), text: '140 decibels', isCorrect: false},
    ]),
};

export const QUESTION_FOUR = {
    question: {text: 'If two sound waves travel at the same speed at different wavelengths, what can we say about them?'},
    answers: shuffle([
        {id: uuidV4(), text: 'The wave with the longer wavelength will have a higher frequency than the wave with the shorter wavelength', isCorrect: false},
        {id: uuidV4(), text: 'The wave with the shorter wavelength will have a higher frequency than the wave with the longer wavelength', isCorrect: true},
        {id: uuidV4(), text: 'Both will have the same frequency', isCorrect: false},
        {id: uuidV4(), text: 'We need more details in order to say anything about them', isCorrect: false},
    ]),
};