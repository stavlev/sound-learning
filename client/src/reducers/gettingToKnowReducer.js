import * as ActionTypes from "../components/getting-to-know/actionTypes";
import * as routes from "../constants/routes";
import * as subjectTextConst from "../constants/subjectText";

const initialState = {
    subjectHeader: '',
    subjectText: ''
};

export default function gettingToKnowReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CHOOSE_SUBJECT: {

            let header = '';
            let text = '';

            switch (action.subject){
                case routes.PITCH_GETTING_TO_KNOW:{
                    header = subjectTextConst.PITCH_GAME_HEADER;
                    text = subjectTextConst.PITCH_GAME_TEXT;
                    break;
                }

                default:{
                    header = '';
                    text = '';
                    break;
                }

            }

            return {
                ...state,
                subjectHeader: header,
                subjectText: text
            };
        }

        default:
            return state;
    }
}