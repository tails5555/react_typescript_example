import axios from 'axios';
import { MusicForm } from '../form';
import { MUSIC_ROOT_URL } from '../action/action_url';

export function music_find_all() : any {
    return axios({
        url : MUSIC_ROOT_URL,
        method : 'get'
    })
}

export function music_find_one(id : number) : any {
    return axios({
        url : `${MUSIC_ROOT_URL}/${id}`,
        method : 'get'
    })
}

export function music_create(musicForm : MusicForm) : any {
    return axios({
        url : `${MUSIC_ROOT_URL}`,
        method : 'post',
        data : musicForm
    });
}

export function music_update(id : number, musicForm : MusicForm) : any {
    return axios({
        url : `${MUSIC_ROOT_URL}/${id}`,
        method : 'put',
        data : musicForm
    });
}

export function music_delete(id : number) : any {
    return axios({
        url : `${MUSIC_ROOT_URL}/${id}`,
        method : 'delete'
    });
}