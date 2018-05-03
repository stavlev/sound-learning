import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import sortGameReducer from './sortGameReducer'
import multiChoiceGameReducer from './multiChoiceGameReducer'
import memoryGameReducer from './memoryGameReducer'
import sessionReducer from './sessionReducer';
import gettingToKnowReducer from './gettingToKnowReducer';

const rootReducer = combineReducers({
    main: mainReducer,
    sessionState: sessionReducer,
    sortGame: sortGameReducer,
    multiChoiceGame: multiChoiceGameReducer,
    gettingToKnow: gettingToKnowReducer,
    memoryGame: memoryGameReducer
});

export default rootReducer;
