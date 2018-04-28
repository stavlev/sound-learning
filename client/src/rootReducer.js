import { combineReducers } from 'redux';
import mainReducer from './components/layout/reducer';
import sortGameReducer from './components/levels/sort-game/reducer'
import multiChoiceGameReducer from './components/levels/multi-choice-question-game/reducer'
import sessionReducer from './reducers/session';

const rootReducer = combineReducers({
    main: mainReducer,
    sortGame: sortGameReducer,
    sessionState: sessionReducer,
    multiChoiceGame: multiChoiceGameReducer,
});

export default rootReducer;
