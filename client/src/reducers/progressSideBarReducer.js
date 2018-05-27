import * as ActionTypes from "../components/layout/actionTypes";
import * as routes from "../constants/routes";
import {LEVELS} from "../constants/levels";

const INITIAL_STATE = {
    levels : LEVELS
};

export default function progressSideBarReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_LEVELS: {

            const {level, subLevel} = action;

            let tempLevels = state.levels;

            switch (subLevel) {
                case 2: {
                    for (let i = 0; i < level - 1; i++){
                        tempLevels[i].isEnabled = true;
                        for (let j = 0; j < 5; j++){
                            tempLevels[i].subLevels[j].isEnabled = true;
                        }
                    }

                    tempLevels[level - 1].isEnabled = true;
                    tempLevels[level - 1].subLevels[subLevel - 1].isEnabled = true;
                    tempLevels[level - 1].subLevels[subLevel - 2].isEnabled = true;

                    break;
                }
                case 0: {
                    for (let i = 0; i < 5; i++){
                        tempLevels[i].isEnabled = false;
                        for (let j = 0; j < 5; j++){
                            tempLevels[i].subLevels[j].isEnabled = false;
                        }
                    }
                    break;
                }
                default: {
                    for (let i = 0; i < level - 1; i++){
                        tempLevels[i].isEnabled = true;
                        for (let j = 0; j < 5; j++){
                            tempLevels[i].subLevels[j].isEnabled = true;
                        }
                    }

                    for (let j = 0; j < subLevel - 1; j++){
                        tempLevels[level -1].subLevels[j].isEnabled = true;
                    }

                    tempLevels[level - 1].subLevels[subLevel - 1].isEnabled = true;

                    break;
                }
            }

            return {
                ...state,
                levels: tempLevels,
            };

        }

        default:
            return state;
    }
}