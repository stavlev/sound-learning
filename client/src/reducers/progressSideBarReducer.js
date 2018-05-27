import * as ActionTypes from "../components/layout/actionTypes";
import * as routes from "../constants/routes";

const INITIAL_STATE = {
    levels : [
        {
            key: 1,
            isEnabled: false,
            header: "Level 1 - Discovering Pitch",
            subLevels: [
                {
                    key: 1,
                    header: "Getting to know",
                    isEnabled: false,
                    routeTo: routes.PITCH_GETTING_TO_KNOW,
                },
                {
                    key: 2,
                    header: "Game 1",
                    isEnabled: false,
                    routeTo: routes.PITCH_SORT_GAME,
                },
                {
                    key: 3,
                    header: "Game 2",
                    isEnabled: false,
                    routeTo: routes.PITCH_MULTI_CHOICE_GAME,
                },
                {
                    key: 4,
                    header: "Game 3",
                    isEnabled: false,
                    routeTo: routes.PITCH_MEMORY_GAME,
                },
                {
                    key: 5,
                    header: "Equalizer Game",
                    isEnabled: false,
                    routeTo: routes.PITCH_EQUALIZER,
                },
            ]
        },
        {
            key: 2,
            isEnabled: false,
            header: "Level 2 - Discovering Loudness",
            subLevels: [
                {
                    key: 1,
                    header: "Getting to know",
                    isEnabled: false,
                    routeTo: routes.LOUDNESS_GETTING_TO_KNOW,
                },
                {
                    key: 2,
                    header: "Game 1",
                    isEnabled: false,
                    routeTo: routes.LOUDNESS_SORT_GAME,
                },
                {
                    key: 3,
                    header: "Game 2",
                    isEnabled: false,
                    routeTo: routes.LOUDNESS_MULTI_CHOICE_GAME,
                },
                {
                    key: 4,
                    header: "Game 3",
                    isEnabled: false,
                    routeTo: routes.LOUDNESS_MEMORY_GAME,
                },
                {
                    key: 5,
                    header: "Equalizer Game",
                    isEnabled: false,
                    routeTo: routes.LOUDNESS_EQUALIZER,
                },
            ]
        },
        {
            key: 3,
            isEnabled: false,
            header: "Level 3 - Discovering Timbre",
            subLevels: [
                {
                    key: 1,
                    header: "Getting to know",
                    isEnabled: false,
                    routeTo: routes.TIMBRE_GETTING_TO_KNOW,
                },
                {
                    key: 2,
                    header: "Game 1",
                    isEnabled: false,
                    routeTo: routes.TIMBRE_SORT_GAME,
                },
                {
                    key: 3,
                    header: "Game 2",
                    isEnabled: false,
                    routeTo: routes.TIMBRE_MULTI_CHOICE_GAME,
                },
                {
                    key: 4,
                    header: "Game 3",
                    isEnabled: false,
                    routeTo: routes.TIMBRE_MEMORY_GAME,
                },
                {
                    key: 5,
                    header: "Equalizer Game",
                    isEnabled: false,
                    routeTo: routes.TIMBRE_EQUALIZER,
                },
            ]
        },
        {
            key: 4,
            isEnabled: false,
            header: "Level 4 - Discovering Wavelength",
            subLevels: [
                {
                    key: 1,
                    header: "Getting to know",
                    isEnabled: false,
                    routeTo: routes.WAVELENGTH_GETTING_TO_KNOW,
                },
                {
                    key: 2,
                    header: "Game 1",
                    isEnabled: false,
                    routeTo: routes.WAVELENGTH_SORT_GAME,
                },
                {
                    key: 3,
                    header: "Game 2",
                    isEnabled: false,
                    routeTo: routes.WAVELENGTH_MULTI_CHOICE_GAME,
                },
                {
                    key: 4,
                    header: "Game 3",
                    isEnabled: false,
                    routeTo: routes.WAVELENGTH_MEMORY_GAME,
                },
                {
                    key: 5,
                    header: "Equalizer Game",
                    isEnabled: false,
                    routeTo: routes.WAVELENGTH_EQUALIZER,
                },
            ]
        },
        {
            key: 5,
            isEnabled: false,
            header: "Level 5 - Discovering Wave Shape",
            subLevels: [
                {
                    key: 1,
                    header: "Getting to know",
                    isEnabled: false,
                    routeTo: routes.WAVE_SHAPE_GETTING_TO_KNOW,
                },
                {
                    key: 2,
                    header: "Game 1",
                    isEnabled: false,
                    routeTo: routes.WAVE_SHAPE_SORT_GAME,
                },
                {
                    key: 3,
                    header: "Game 2",
                    isEnabled: false,
                    routeTo: routes.WAVE_SHAPE_MULTI_CHOICE_GAME,
                },
                {
                    key: 4,
                    header: "Game 3",
                    isEnabled: false,
                    routeTo: routes.WAVE_SHAPE_MEMORY_GAME,
                },
                {
                    key: 5,
                    header: "Equalizer Game",
                    isEnabled: false,
                    routeTo: routes.WAVE_SHAPE_EQUALIZER,
                },
            ]
        }
    ],
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