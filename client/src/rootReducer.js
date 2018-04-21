import { combineReducers } from 'redux';
import mainReducer from './components/layout/reducer';
import sortGameReducer from './components/levels/first-level/reducer'
import sessionReducer from './reducers/session';

const rootReducer = combineReducers({
    main: mainReducer,
    sortGame: sortGameReducer,
    sessionState: sessionReducer
});

export default rootReducer;
