import { combineReducers } from 'redux';
import mainReducer from './components/layout/reducer';
import sortGameReducer from './components/levels/first-level/reducer';
import pitchEqualizerReducer from './components/levels/first-level/equalizer/reducer';

const rootReducer = combineReducers({
    main: mainReducer,
    sortGame: sortGameReducer,
    equalizerGame: pitchEqualizerReducer
});

export default rootReducer;
