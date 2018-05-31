import * as ActionTypes from "./actionTypes";
import * as routes from "../../constants/routes";
import * as subjectTextConst from "../../constants/subjectText";

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
                case routes.LOUDNESS_GETTING_TO_KNOW:{
                    header = subjectTextConst.LOUDNESS_GAME_HEADER;
                    text = subjectTextConst.LOUDNESS_GAME_TEXT;
                    break;
                }
                case routes.CONVOLVER_GETTING_TO_KNOW:{
                    header = subjectTextConst.CONVOLVER_GAME_HEADER;
                    text = subjectTextConst.CONVOLVER_GAME_TEXT;
                    break;
                }
                case routes.WAVELENGTH_GETTING_TO_KNOW:{
                    header = subjectTextConst.WAVE_LENGTH_GAME_HEADER;
                    text = subjectTextConst.WAVE_LENGTH_GAME_TEXT;
                    break;
                }
                case routes.WAVE_SHAPE_GETTING_TO_KNOW:{
                    header = subjectTextConst.WAVE_SHAPE_GAME_HEADER;
                    text = subjectTextConst.WAVE_SHAPE_GAME_TEXT;
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