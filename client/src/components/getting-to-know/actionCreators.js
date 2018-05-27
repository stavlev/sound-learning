import * as ActionTypes from './actionTypes';

export const chooseSubject = (subject) => {
    return {
        type: ActionTypes.CHOOSE_SUBJECT,
        subject: subject
    };
};