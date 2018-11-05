import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RootRouter } from './router';

const ApplicationRoot : React.StatelessComponent<{}> = () => (
    <Router>
        <RootRouter />        
    </Router>
)

export default ApplicationRoot;