import axios from 'axios';

import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk'

import { FETCH_GENRE_LIST, FETCH_GENRE_LIST_SUCCESS, FETCH_GENRE_LIST_FAILURE } from './type/type_genre';
import { GenreModel } from './model';

const ROOT_URL = 'http://127.0.0.1:8000/ex03_api/genre';

interface ActionObj {
    type : typeof FETCH_GENRE_LIST;
    payload? : object;
}

type FetchEntity = (id: string) => ThunkAction<Promise<any>, ActionObj, any, any>;

const fetchGenreListApi : any = () => {
    return axios({
        url : ROOT_URL,
        method : 'get'
    });
}

const fetchGenreList : (() => ActionObj) = () => ({
    type : FETCH_GENRE_LIST
});

const fetchGenreListSuccess : ((response : any) => ActionObj) = (response : any) => {
    const { data } = response;
    return {
        type : FETCH_GENRE_LIST_SUCCESS,
        payload : data.map((genre : any) => new GenreModel(genre.id, genre.name))
    };
}

const fetchGenreListFailure : ((response : any) => ActionObj) = (error : any) => ({
    type : FETCH_GENRE_LIST_FAILURE,
    payload : error  
});

export const fetchGenreListAction : FetchEntity = () => (dispatch : Dispatch) => {
    dispatch(fetchGenreList());

    return fetchGenreListApi().then((response : any) => {
        setTimeout(() => {
            dispatch(fetchGenreListSuccess(response));
        }, 2000);
    }).catch((error : any) => {
        dispatch(fetchGenreListFailure(error && error.message));
    });
}