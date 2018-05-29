import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import sortGameReducer from './sortGameReducer'
import multiChoiceGameReducer from './multiChoiceGameReducer'
import memoryGameReducer from './memoryGameReducer'
import sessionReducer from './sessionReducer';
import gettingToKnowReducer from './gettingToKnowReducer';
import progressSideBarReducer from "./progressSideBarReducer";
import pitchEqualizerReducer from "../components/levels/equalizer/reducer";

const rootReducer = combineReducers({
    main: mainReducer,
    sessionState: sessionReducer,
    sortGame: sortGameReducer,
    multiChoiceGame: multiChoiceGameReducer,
    gettingToKnow: gettingToKnowReducer,
    memoryGame: memoryGameReducer,
    progressSideBar: progressSideBarReducer,
    pitchEqualizer: pitchEqualizerReducer
});

export default rootReducer;
