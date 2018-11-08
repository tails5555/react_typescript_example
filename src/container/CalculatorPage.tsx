import * as React from 'react';
import { Link } from 'react-router-dom';
import { CalculatorBody } from '../component/01_Calculator';

const CalculatorPage : React.StatelessComponent<{}> = () => (
    <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
        <CalculatorBody />
        <Link to="/">
            <button className="btn btn-info btn-block" style={{ marginTop : '10px', marginBottom : '10px' }}>이전으로</button>
        </Link>
    </div>
);

export default CalculatorPage;