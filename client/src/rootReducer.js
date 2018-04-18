import { combineReducers } from 'redux';
import mainReducer from './components/layout/reducer';
import sortGameReducer from './components/levels/first-level/reducer'

const rootReducer = combineReducers({
    main: mainReducer,
    sortGame: sortGameReducer
});

export default rootReducer;
