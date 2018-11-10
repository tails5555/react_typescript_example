import * as React from 'react';

interface Props {
    label : string;
    value : string;
    name : string;
    onChange : any;
    error : string;
}

const InputRender : React.StatelessComponent<Props> = ({ label, value, name, onChange, error }) => (
    <div className={`form-group ${error === '' ? 'has-success' : 'has-danger'}`}>
        <label>{label}</label>
        <input className={`form-control ${error === '' ? 'is-valid' : 'is-invalid'}`} type="text" value={value} name={name} placeholder={label} onChange={onChange} />
        {
            error !== '' ?
                <div className="invalid-feedback">
                    {error}
                </div> : null
        }
    </div>
);

export default InputRender;