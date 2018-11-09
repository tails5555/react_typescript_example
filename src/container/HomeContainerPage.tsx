import * as React from 'react';
import { Link } from 'react-router-dom';

const HomeContainerPage : React.StatelessComponent<{}> = () => (
    <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
        <h1>React + TypeScript Example</h1>
        <hr/>
        <div className="d-flex flex-column bd-highlight mb-3">
            <Link to="/example/calculator">
                <button className="btn btn-primary btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>01_Calculator</button>
            </Link>
            <Link to="/example/phone_list">
                <button className="btn btn-primary btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>02_Phone_Book</button>
            </Link>
        </div>
    </div>
);

export default HomeContainerPage;