import axios from 'axios';

import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk'

import { FETCH_PUBLISHER_LIST, FETCH_PUBLISHER_LIST_SUCCESS, FETCH_PUBLISHER_LIST_FAILURE } from './type/type_publisher';
import { PublisherModel } from './model';

const ROOT_URL = 'http://127.0.0.1:8000/ex03_api/publisher';

interface ActionObj {
    type : typeof FETCH_PUBLISHER_LIST;
    payload? : object;
}

type FetchEntity = (id: string) => ThunkAction<Promise<any>, ActionObj, any, any>;

const fetchPublisherListApi : any = () => {
    return axios({
        url : ROOT_URL,
        method : 'get'
    });
}

const fetchPublisherList : (() => ActionObj) = () => ({
    type : FETCH_PUBLISHER_LIST
});

const fetchPublisherListSuccess : ((response : any) => ActionObj) = (response : any) => {
    const { data } = response;
    return {
        type : FETCH_PUBLISHER_LIST_SUCCESS,
        payload : data.map((genre : any) => new PublisherModel(genre.id, genre.name))
    };
}

const fetchPublisherListFailure : ((response : any) => ActionObj) = (error : any) => ({
    type : FETCH_PUBLISHER_LIST_FAILURE,
    payload : error  
});

export const fetchPublisherListAction : FetchEntity = () => (dispatch : Dispatch) => {
    dispatch(fetchPublisherList());

    return fetchPublisherListApi().then((response : any) => {
        setTimeout(() => {
            dispatch(fetchPublisherListSuccess(response));
        }, 2000);
    }).catch((error : any) => {
        dispatch(fetchPublisherListFailure(error && error.message));
    });
}