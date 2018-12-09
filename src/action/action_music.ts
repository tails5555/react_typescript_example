import axios from 'axios';

import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk'

import { 
    FETCH_MUSIC_LIST, FETCH_MUSIC_LIST_SUCCESS, FETCH_MUSIC_LIST_FAILURE,
    FETCH_MUSIC_ELEMENT, FETCH_MUSIC_ELEMENT_SUCCESS, FETCH_MUSIC_ELEMENT_FAILURE, RESET_FETCH_MUSIC_ELEMENT,
    CREATE_MUSIC_ELEMENT, CREATE_MUSIC_ELEMENT_SUCCESS, CREATE_MUSIC_ELEMENT_FAILURE,
    UPDATE_MUSIC_ELEMENT, UPDATE_MUSIC_ELEMENT_SUCCESS, UPDATE_MUSIC_ELEMENT_FAILURE, RESET_SAVE_MUSIC_ELEMENT, DELETE_MUSIC_ELEMENT, DELETE_MUSIC_ELEMENT_SUCCESS, DELETE_MUSIC_ELEMENT_FAILURE
} from './type/type_music';

import { MusicModel } from './model';
import { MusicForm } from './form';

const ROOT_URL = 'http://127.0.0.1:8000/ex03_api/music';

interface ActionObj {
    type : typeof FETCH_MUSIC_LIST;
    payload? : object;
}

type FetchListEntity = () => ThunkAction<Promise<any>, ActionObj, any, any>;
type FetchElementEntity = (id : number) => ThunkAction<Promise<any>, ActionObj, any, any>;
type CreateEntity = (form : MusicForm) => ThunkAction<Promise<any>, ActionObj, any, any>;
type UpdateEntity = (id : number, form : MusicForm) => ThunkAction<Promise<any>, ActionObj, any, any>;
type ResetEntity = (dispatch : Dispatch) => void;
type DeleteEntity = (id : number) => ThunkAction<Promise<any>, ActionObj, any, any>;

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

export const fetchMusicListAction : FetchListEntity = () => (dispatch : Dispatch) => {
    dispatch(fetchMusicList());

    return fetchMusicListApi().then((response : any) => {
        setTimeout(() => {
            dispatch(fetchMusicListSuccess(response));
        }, 2000);
    }).catch((error : any) => {
        dispatch(fetchMusicListFailure(error && error.message));
    });
}

const fetchMusicElementApi : any = (id : number) => {
    return axios({
        url : `${ROOT_URL}/${id}`,
        method : 'get'
    });
}

const fetchMusicElement : (() => ActionObj) = () => ({
    type : FETCH_MUSIC_ELEMENT
});

const fetchMusicElementSuccess : ((response : any) => ActionObj) = (response : any) => {
    const { data } = response;
    return {
        type : FETCH_MUSIC_ELEMENT_SUCCESS,
        payload : new MusicModel(data.id, data.title, data.singer, data.year, data.genre, data.publisher)
    };
}

const fetchMusicElementFailure : ((error : any) => ActionObj) = (error : any) => ({
    type : FETCH_MUSIC_ELEMENT_FAILURE,
    payload : error
});

const resetFetchMusicElement : (() => ActionObj) = () => ({
    type : RESET_FETCH_MUSIC_ELEMENT
});

export const fetchMusicElementAction : FetchElementEntity = (id : number) => (dispatch : Dispatch) => {
    dispatch(fetchMusicElement());

    return fetchMusicElementApi(id).then((response : any) => {
        setTimeout(() => {
            dispatch(fetchMusicElementSuccess(response));
        }, 2000);
    }).catch((error : any) => {
        dispatch(fetchMusicElementFailure(error && error.message));
    });
}

export const resetFetchMusicElementAction : ResetEntity = () => (dispatch : Dispatch) => {
    dispatch(resetFetchMusicElement());
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

const updateMusicElementApi : any = (id : number, form : MusicForm) => {
    return axios({
        url : `${ROOT_URL}/${id}`,
        method : 'put',
        data : {
            id,
            title : form.getTitle,
            singer : form.getSinger,
            year : form.getYear,
            genre : form.getGenreId,
            publisher : form.getPublisherId
        }
    });
}

const updateMusicElement : (() => ActionObj) = () => ({
    type : UPDATE_MUSIC_ELEMENT
});

const updateMusicElementSuccess : ((response : any) => ActionObj) = (response : any) => {
    const { data } = response;
    return {
        type : UPDATE_MUSIC_ELEMENT_SUCCESS,
        payload : new MusicModel(data.id, data.title, data.singer, data.year, data.genre, data.publisher)
    };
}

const updateMusicElementFailure : ((error : any) => ActionObj) = (error : any) => ({
    type : UPDATE_MUSIC_ELEMENT_FAILURE,
    payload : error
});

export const updateMusicElementAction : UpdateEntity = (id : number, form : MusicForm) => (dispatch : Dispatch) => {
    dispatch(updateMusicElement());

    return updateMusicElementApi(id, form).then((response : any) => {
        setTimeout(() => {
            dispatch(updateMusicElementSuccess(response));
        }, 2000);
    }).catch((error : any) => {
        dispatch(updateMusicElementFailure(error && error.message));
    });
}

const resetSaveMusicElement : (() => ActionObj) = () => ({
    type : RESET_SAVE_MUSIC_ELEMENT
});

export const resetSaveMusicElementAction : ResetEntity = () => (dispatch : Dispatch) => {
    dispatch(resetSaveMusicElement());
}

const deleteMusicElementApi : any = (id : number) => {
    return axios({
        url : `${ROOT_URL}/${id}`,
        method : 'delete'
    });
}

const deleteMusicElement : (() => ActionObj) = () => ({
    type : DELETE_MUSIC_ELEMENT
})

const deleteMusicElementSuccess : ((response : any) => ActionObj) = (response : any) => {
    const { status } = response;
    return {
        type : DELETE_MUSIC_ELEMENT_SUCCESS,
        payload : status
    };
}

const deleteMusicElementFailure : ((error : any) => ActionObj) = (error : any) => ({
    type : DELETE_MUSIC_ELEMENT_FAILURE,
    payload : error
});

export const deleteMusicElementAction : DeleteEntity = (id : number) => (dispatch : Dispatch) => {
    dispatch(deleteMusicElement());
    
    return deleteMusicElementApi(id).then((response : any) => {
        setTimeout(() => {
            dispatch(deleteMusicElementSuccess(response));
        }, 2000);
    }).catch((error : any) => {
        dispatch(deleteMusicElementFailure(error && error.message));
    });
}