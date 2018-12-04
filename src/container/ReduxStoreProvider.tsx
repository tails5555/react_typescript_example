import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '../store/promise_store';
import ReduxMusicTablePage from './ReduxMusicTablePage';

const store = configureStore();

const ReduxStoreProvider : React.StatelessComponent<RouteComponentProps<any>> = ({ match, location, history }) => (
    <Provider store={store}>
        <Route exact path={`${match.url}/music_list`} component={ReduxMusicTablePage} />
    </Provider>
);

export default ReduxStoreProvider;