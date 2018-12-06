import * as React from 'react';

interface Props {
    label : string;
    value : number;
    name : string;
    onChange : any;
    options : any;
}

const SelectRender : React.StatelessComponent<Props> = ({ label, value, name, onChange, options }) => (
    <div className="form-group">
        <label>{label}</label>
        <select className="form-control" value={value} name={name} placeholder={label} onChange={onChange}>
            {options}
        </select>
    </div>
);

export default SelectRender;