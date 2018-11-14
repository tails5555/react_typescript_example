import axios from 'axios';
import { PUBLISHER_ROOT_URL } from '../action/action_url';

export function publisher_find_one(id : number) : any {
    return axios({
        url : `${PUBLISHER_ROOT_URL}/${id}`,
        method : 'get'
    });
}