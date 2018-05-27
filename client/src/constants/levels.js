import * as routes from "./routes";

export let LEVELS = [
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
        header: "Level 3 - Discovering Convolution Reverb",
        subLevels: [
            {
                key: 1,
                header: "Getting to know",
                isEnabled: false,
                routeTo: routes.CONVOLVER_GETTING_TO_KNOW,
            },
            {
                key: 2,
                header: "Game 1",
                isEnabled: false,
                routeTo: routes.CONVOLVER_SORT_GAME,
            },
            {
                key: 3,
                header: "Game 2",
                isEnabled: false,
                routeTo: routes.CONVOLVER_MULTI_CHOICE_GAME,
            },
            {
                key: 4,
                header: "Game 3",
                isEnabled: false,
                routeTo: routes.CONVOLVER_MEMORY_GAME,
            },
            {
                key: 5,
                header: "Equalizer Game",
                isEnabled: false,
                routeTo: routes.CONVOLVER_EQUALIZER,
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
];