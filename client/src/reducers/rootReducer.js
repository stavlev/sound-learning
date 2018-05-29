import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import sortGameReducer from '../components/levels/sort-game/sortGameReducer'
import multiChoiceGameReducer from '../components/levels/multi-choice-question-game/multiChoiceGameReducer'
import memoryGameReducer from '../components/levels/memory-game/memoryGameReducer'
import sessionReducer from './sessionReducer';
import gettingToKnowReducer from '../components/getting-to-know/gettingToKnowReducer';
import progressSideBarReducer from "../components/layout/progressSideBarReducer";

const rootReducer = combineReducers({
    main: mainReducer,
    sessionState: sessionReducer,
    sortGame: sortGameReducer,
    multiChoiceGame: multiChoiceGameReducer,
    gettingToKnow: gettingToKnowReducer,
    memoryGame: memoryGameReducer,
    progressSideBar: progressSideBarReducer,
});

export default rootReducer;
