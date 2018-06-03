import * as ActionTypes from "./actionTypes";
import * as routes from "../../constants/routes";
import * as subjectTextConst from "../../constants/subjectText";
import pitchImage from "../../assets/Frequency.png";
import loudnessImage from "../../assets/Loudness.jpg";
import convolverImage from "../../assets/ConvolutionReverb.jpg";
import waveShapeImage from "../../assets/WaveShape.png";
import waveLengthImage from "../../assets/WaveLength.jpg";

const initialState = {
    subjectHeader: '',
    subjectText: '',
    subjectImage: null,
};

export default function gettingToKnowReducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.CHOOSE_SUBJECT: {

            let header = '';
            let text = '';
            let image = null;

            switch (action.subject) {
                case routes.PITCH_GETTING_TO_KNOW: {
                    header = subjectTextConst.PITCH_GAME_HEADER;
                    text = subjectTextConst.PITCH_GAME_TEXT;
                    image = pitchImage;
                    break;
                }
                case routes.LOUDNESS_GETTING_TO_KNOW: {
                    header = subjectTextConst.LOUDNESS_GAME_HEADER;
                    text = subjectTextConst.LOUDNESS_GAME_TEXT;
                    image = loudnessImage;
                    break;
                }
                case routes.CONVOLVER_GETTING_TO_KNOW: {
                    header = subjectTextConst.CONVOLVER_GAME_HEADER;
                    text = subjectTextConst.CONVOLVER_GAME_TEXT;
                    image = convolverImage;
                    break;
                }
                case routes.WAVELENGTH_GETTING_TO_KNOW: {
                    header = subjectTextConst.WAVE_LENGTH_GAME_HEADER;
                    text = subjectTextConst.WAVE_LENGTH_GAME_TEXT;
                    image = waveLengthImage;
                    break;
                }
                case routes.WAVE_SHAPE_GETTING_TO_KNOW: {
                    header = subjectTextConst.WAVE_SHAPE_GAME_HEADER;
                    text = subjectTextConst.WAVE_SHAPE_GAME_TEXT;
                    image = waveShapeImage;
                    break;
                }
                default: {
                    header = '';
                    text = '';
                    image = null;
                    break;
                }

            }

            return {
                ...state,
                subjectHeader: header,
                subjectText: text,
                subjectImage: image,
            };
        }

        default:
            return state;
    }
}