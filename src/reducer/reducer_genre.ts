import { Reducer } from 'redux';
import { GenreModel } from '../action/model';
import {
    FETCH_GENRE_LIST, FETCH_GENRE_LIST_SUCCESS, FETCH_GENRE_LIST_FAILURE
} from '../action/type/type_genre';

export interface GenreState {
    readonly genres : GenreModel[];
    readonly loading : boolean;
    readonly error : string | null;
}

const INITIAL_STATE : GenreState = {
    genres : [],
    loading : false,
    error : null
};

export const genreReducer : Reducer<GenreState> = (state = INITIAL_STATE, action : any) => {
    switch(action.type){
        case FETCH_GENRE_LIST :
            return { ...state, loading : true };
        case FETCH_GENRE_LIST_SUCCESS :
            return { ...state, loading : false, genres : action.payload };
        case FETCH_GENRE_LIST_FAILURE :
            return { ...state, loading : false, error : action.payload };

        default :
            return state;
    }
}