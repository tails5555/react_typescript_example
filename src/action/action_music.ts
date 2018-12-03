import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8000/ex03_api/music';

export const FETCH_MUSIC_LIST : string = 'FETCH_MUSIC_LIST';
export const FETCH_MUSIC_LIST_SUCCESS : string = 'FETCH_MUSIC_LIST_SUCCESS';
export const FETCH_MUSIC_LIST_FAILURE : string = 'FETCH_MUSIC_LIST_FAILURE';
export const RESET_FETCH_MUSIC_LIST : string = 'RESET_FETCH_MUSIC_LIST';

interface ActionObj {
    type : typeof FETCH_MUSIC_LIST;
    payload? : object;
}

const fetchMusicListApi : any = () => {
    return axios({
        url : ROOT_URL,
        method : 'get'
    });
}

export const fetchMusicList : () => ActionObj = () => (
    {
        type : FETCH_MUSIC_LIST,
        payload : fetchMusicListApi()
    }
);

export const fetchMusicListSuccess : (response : any) => ActionObj = (response : any) => {
    return {
        type : FETCH_MUSIC_LIST_SUCCESS,
        payload : response.data
    };
}

export const fetchMusicListFailure : (response : any) => ActionObj = (error : any) => ({
    type : FETCH_MUSIC_LIST_FAILURE,
    payload : error
});

export const resetFetchMusicList : (response : any) => ActionObj = () => {
    return {
        type : RESET_FETCH_MUSIC_LIST
    }
}