import { combineReducers } from 'redux';
import { MusicState, musicReducer } from './reducer_music';
import { GenreState, genreReducer } from './reducer_genre';
import { PublisherState, publisherReducer } from './reducer_publisher';

export interface ReducerState {
    music : MusicState;
    genre : GenreState;
    publisher : PublisherState;
}

export const rootReducer = combineReducers({
    music : musicReducer,
    genre : genreReducer,
    publisher : publisherReducer
});