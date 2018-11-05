import * as React from 'react';

interface Props {
    oper : string;
    btnAction : () => void;
}

const OperationButton : React.StatelessComponent<Props> = ({oper, btnAction}) => (
    <button className="btn btn-primary" onClick={btnAction}>{oper}</button>
);

export default OperationButton;