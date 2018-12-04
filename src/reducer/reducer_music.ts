import { Reducer } from 'redux';
import { MusicModel } from '../action/model';
import {
    FETCH_MUSIC_LIST, FETCH_MUSIC_LIST_SUCCESS, FETCH_MUSIC_LIST_FAILURE, RESET_FETCH_MUSIC_LIST
} from '../action/action_music';

interface MusicState {
    readonly musics : MusicModel[];
    readonly music : MusicModel | null;
    readonly loading : boolean;
    readonly error : string | null;
    readonly status : number;
}

const INITIAL_STATE : MusicState = {
    musics : [],
    music : null,
    loading : false,
    error : null,
    status : 0
};

const reducer : Reducer<MusicState> = (state = INITIAL_STATE, action : any) => {
    switch(action.type){
        case FETCH_MUSIC_LIST :
            return { ...state, loading : true };
        case FETCH_MUSIC_LIST_SUCCESS :
            return { ...state, loading : false, musics : action.payload };
        case FETCH_MUSIC_LIST_FAILURE :
            return { ...state, loading : false, error : action.payload };
        case RESET_FETCH_MUSIC_LIST :
            return { ...state, loading : false, musics : [], error : null };

        default :
            return state;
    }
}

export { reducer as musicReducer };