import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import sortGameReducer from './sortGameReducer'
import multiChoiceGameReducer from './multiChoiceGameReducer'
import memoryGameReducer from './memoryGameReducer'
import sessionReducer from './sessionReducer';
import gettingToKnowReducer from './gettingToKnowReducer';
import progressSideBarReducer from "./progressSideBarReducer";
import simonSaysGameReducer from "./simonSaysGameReducer";
import simonSaysMatchReducer from "./simonSaysMatchReducer";
import simonSaysPadsReducer from "./simonSaysPadsReducer";

const rootReducer = combineReducers({
    main: mainReducer,
    sessionState: sessionReducer,
    sortGame: sortGameReducer,
    multiChoiceGame: multiChoiceGameReducer,
    gettingToKnow: gettingToKnowReducer,
    memoryGame: memoryGameReducer,
    progressSideBar: progressSideBarReducer,
    simonSaysGame: simonSaysGameReducer,
    simonSaysMatch: simonSaysMatchReducer,
    simonSaysPads: simonSaysPadsReducer,
});

export default rootReducer;
