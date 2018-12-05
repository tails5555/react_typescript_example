import { Reducer } from 'redux';
import { PublisherModel } from '../action/model';
import {
    FETCH_PUBLISHER_LIST, FETCH_PUBLISHER_LIST_SUCCESS, FETCH_PUBLISHER_LIST_FAILURE
} from '../action/type/type_publisher';

export interface PublisherState {
    readonly publishers : PublisherModel[];
    readonly loading : boolean;
    readonly error : string | null;
}

const INITIAL_STATE : PublisherState = {
    publishers : [],
    loading : false,
    error : null
};

export const publisherReducer : Reducer<PublisherState> = (state = INITIAL_STATE, action : any) => {
    switch(action.type){
        case FETCH_PUBLISHER_LIST :
            return { ...state, loading : true };
        case FETCH_PUBLISHER_LIST_SUCCESS :
            return { ...state, loading : false, publishers : action.payload };
        case FETCH_PUBLISHER_LIST_FAILURE :
            return { ...state, loading : false, error : action.payload };

        default :
            return state;
    }
}