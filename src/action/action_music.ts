import axios from 'axios';

import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk'

import { FETCH_MUSIC_LIST, FETCH_MUSIC_LIST_SUCCESS, FETCH_MUSIC_LIST_FAILURE } from './type/type_music';
import { MusicModel } from './model';

const ROOT_URL = 'http://127.0.0.1:8000/ex03_api/music';

interface ActionObj {
    type : typeof FETCH_MUSIC_LIST;
    payload? : object;
}

type FetchEntity = (id: string) => ThunkAction<Promise<any>, ActionObj, any, any>;

const fetchMusicListApi : any = () => {
    return axios({
        url : ROOT_URL,
        method : 'get'
    });
}

const fetchMusicList : (() => ActionObj) = () => ({
    type : FETCH_MUSIC_LIST
});

const fetchMusicListSuccess : ((response : any) => ActionObj) = (response : any) => {
    const { data } = response;
    return {
        type : FETCH_MUSIC_LIST_SUCCESS,
        payload : data.map((music : any) => new MusicModel(music.id, music.title, music.singer, music.genre, music.year, music.publisher))
    };
}

const fetchMusicListFailure : ((response : any) => ActionObj) = (error : any) => ({
    type : FETCH_MUSIC_LIST_FAILURE,
    payload : error  
});

export const fetchMusicListAction : FetchEntity = () => (dispatch : Dispatch) => {
    dispatch(fetchMusicList());

    return fetchMusicListApi().then((response : any) => {
        setTimeout(() => {
            dispatch(fetchMusicListSuccess(response));
        }, 2000);
    }).catch((error : any) => {
        dispatch(fetchMusicListFailure(error && error.message));
    });
}