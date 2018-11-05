import * as React from 'react';
import { Route } from 'react-router-dom';
import CalculatorPage from '../container/CalculatorPage';

const RootRouter : React.StatelessComponent<{}> = () => (
    <React.Fragment>
        <Route exact path="/example/calculator" component={CalculatorPage} />
    </React.Fragment>
);

export default RootRouter;