import { combineReducers } from 'redux';
import { musicReducer } from './reducer_music';

export const rootReducer = combineReducers({
    music : musicReducer
});