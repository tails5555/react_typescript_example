import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import { rootReducer } from '../reducer';

export default function configureStore(initialState? : object) {
    const devToolKeyword : string = '__REDUX_DEVTOOLS_EXTENSION__';
    const composeStore = compose(
        applyMiddleware(reduxThunk),
        window[devToolKeyword] ? window[devToolKeyword]() : (f : any) => f
    );
    const store = createStore(rootReducer, initialState, composeStore);

    return store;
}