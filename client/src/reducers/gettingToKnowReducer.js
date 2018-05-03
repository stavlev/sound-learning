import * as ActionTypes from '../components/getting-to-know/actionTypes';
import * as routes from '../constants/routes';
import * as subjectTextConst from '../constants/subjectText'

const initialState = {
    subjectText: ''
};

export default function gettingToKnowReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CHOOSE_SUBJECT: {

            let text = '';

            switch (action.subject){
                case routes.PITCH_GETTING_TO_KNOW:{
                    text = subjectTextConst.PITCH_GAME_TEXT;
                    break;
                }

                default:{
                    text = '';
                    break;
                }

            }

            return {
                ...state,
                subjectText: text
            };
        }

        default:
            return state;
    }
}