import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import sortGameReducer from '../components/levels/sort-game/sortGameReducer';
import multiChoiceGameReducer from '../components/levels/multi-choice-question-game/multiChoiceGameReducer';
import memoryGameReducer from '../components/levels/memory-game/memoryGameReducer';
import sessionReducer from './sessionReducer';
import gettingToKnowReducer from '../components/getting-to-know/gettingToKnowReducer';
import progressSideBarReducer from "../components/layout/progressSideBarReducer";
import pitchEqualizerReducer from "../components/levels/pitch-equalizer/reducer";
import loudnessEqualizerReducer from "../components/levels/loudness-equalizer/reducer";

const rootReducer = combineReducers({
    main: mainReducer,
    sessionState: sessionReducer,
    sortGame: sortGameReducer,
    multiChoiceGame: multiChoiceGameReducer,
    gettingToKnow: gettingToKnowReducer,
    memoryGame: memoryGameReducer,
    progressSideBar: progressSideBarReducer,
    pitchEqualizer: pitchEqualizerReducer,
    loudnessEqualizer: loudnessEqualizerReducer
});

export default rootReducer;
