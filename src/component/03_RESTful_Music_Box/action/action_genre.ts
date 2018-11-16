import axios from 'axios';
import { GENRE_ROOT_URL } from '../action/action_url';

export function genre_find_all() : any {
    return axios({
        url : GENRE_ROOT_URL,
        method : 'get'
    });
}

export function genre_find_one(id : number) : any {
    return axios({
        url : `${GENRE_ROOT_URL}/${id}`,
        method : 'get'
    });
}