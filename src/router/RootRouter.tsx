import * as React from 'react';
import { Route } from 'react-router-dom';
import {HomeContainerPage, CalculatorPage} from '../container';

const RootRouter : React.StatelessComponent<{}> = () => (
    <React.Fragment>
        <Route exact path="/" component={HomeContainerPage} />
        <Route exact path="/example/calculator" component={CalculatorPage} />
    </React.Fragment>
);

export default RootRouter;