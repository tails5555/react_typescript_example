import axios from 'axios';

import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk'

import { 
    FETCH_MUSIC_LIST, FETCH_MUSIC_LIST_SUCCESS, FETCH_MUSIC_LIST_FAILURE,
    CREATE_MUSIC_ELEMENT, CREATE_MUSIC_ELEMENT_SUCCESS, CREATE_MUSIC_ELEMENT_FAILURE, RESET_SAVE_MUSIC_ELEMENT
} from './type/type_music';

import { MusicModel } from './model';
import { MusicForm } from './form';

const ROOT_URL = 'http://127.0.0.1:8000/ex03_api/music';

interface ActionObj {
    type : typeof FETCH_MUSIC_LIST;
    payload? : object;
}

type FetchEntity = (id: string) => ThunkAction<Promise<any>, ActionObj, any, any>;
type CreateEntity = (form : MusicForm) => ThunkAction<Promise<any>, ActionObj, any, any>;

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
        payload : data.map((music : any) => new MusicModel(music.id, music.title, music.singer, music.year, music.genre, music.publisher))
    };
}

const fetchMusicListFailure : ((error : any) => ActionObj) = (error : any) => ({
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

const createMusicElementApi : any = (form : MusicForm) => {
    return axios({
        url : ROOT_URL,
        method : 'post',
        data : {
            id : 0,
            title : form.getTitle,
            singer : form.getSinger,
            year : form.getYear,
            genre : form.getGenreId,
            publisher : form.getPublisherId
        }
    });
}

const createMusicElement : (() => ActionObj) = () => ({
    type : CREATE_MUSIC_ELEMENT
});

const createMusicElementSuccess : ((response : any) => ActionObj) = (response : any) => {
    const { data } = response;
    return {
        type : CREATE_MUSIC_ELEMENT_SUCCESS,
        payload : new MusicModel(data.id, data.title, data.singer, data.year, data.genre, data.publisher)
    };
}

const createMusicElementFailure : ((error : any) => ActionObj) = (error : any) => ({
    type : CREATE_MUSIC_ELEMENT_FAILURE,
    payload : error
});

const resetCreateMusicElement : (() => ActionObj) = () => ({
    type : RESET_SAVE_MUSIC_ELEMENT
});

export const createMusicElementAction : CreateEntity = (form : MusicForm) => (dispatch : Dispatch) => {
    dispatch(createMusicElement());

    return createMusicElementApi(form).then((response : any) => {
        setTimeout(() => {
            dispatch(createMusicElementSuccess(response));
        }, 2000);
    }).catch((error : any) => {
        dispatch(createMusicElementFailure(error && error.message));
    });
}

export const resetCreateMusicElementAction : ((dispatch : Dispatch) => void) = () => (dispatch : Dispatch) => {
    dispatch(resetCreateMusicElement());
}