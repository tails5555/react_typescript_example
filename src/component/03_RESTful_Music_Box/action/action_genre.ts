import axios from 'axios';
import { GenreForm } from '../form'; 
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

export function genre_create(genreForm : GenreForm) : any {
    return axios({
        url : `${GENRE_ROOT_URL}`,
        method : 'post',
        data : {
            id : 0,
            name : genreForm.getName
        }
    });
}

export function genre_update(id : number, genreForm : GenreForm) : any {
    return axios({
        url : `${GENRE_ROOT_URL}/${id}`,
        method : 'put',
        data : {
            id,
            name : genreForm.getName
        }
    });
}

export function genre_delete(id : number) : any {
    return axios({
        url : `${GENRE_ROOT_URL}/${id}`,
        method : 'delete'
    });
}