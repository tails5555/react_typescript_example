import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '../store/promise_store';
import ReduxMusicTableContainer from './ReduxMusicTableContainer';

const store = configureStore();

const ReduxStoreProvider : React.StatelessComponent<RouteComponentProps<any>> = ({ match, location, history }) => (
    <Provider store={store}>
        <Switch>
            <Route exact path={`${match.url}`} render={() => <h1>하하하</h1>} />
            <Route path={`${match.url}/music_list`} component={ReduxMusicTableContainer} />
        </Switch>
    </Provider>
);

export default ReduxStoreProvider;