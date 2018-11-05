import * as React from 'react';
import { CalculatorBody } from '../component/01_Calculator';

const CalculatorPage : React.StatelessComponent<{}> = () => (
    <div className="container" style={{ marginTop : '10px', marginBottom : '10px' }}>
        <CalculatorBody />
    </div>
);

export default CalculatorPage;