import { combineReducers } from 'redux';
import { MusicState, musicReducer } from './reducer_music';

export interface ReducerState {
    music : MusicState;
}

export const rootReducer = combineReducers({
    music : musicReducer
});