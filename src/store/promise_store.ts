import { createStore, applyMiddleware, compose } from 'redux';
import * as Promise from 'redux-promise';
import { rootReducer } from '../reducer';

export default function configureStore(initialState? : object) {
    const devToolKeyword : string = 'devToolsExtension';
    const composeStore = compose(
        applyMiddleware(Promise),
        window[devToolKeyword] ? window[devToolKeyword]() : (f : any) => f
    );
    const store = createStore(rootReducer, initialState, composeStore);

    return store;
}