import * as React from 'react';

interface Props {
    num : number;
    btnAction : () => void;
}

const NumberButton : React.StatelessComponent<Props> = ({num, btnAction}) => (
    <button className="btn btn-info" onClick={btnAction}>{num}</button>
);

export default NumberButton;