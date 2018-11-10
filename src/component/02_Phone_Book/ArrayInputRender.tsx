import * as React from 'react';

interface Props {
    label : string;
    value : string[];
    name : string;
    onChange : any;
    onClickCreate : () => void;
    onClickDelete : any;
    error : string[];
}

const ArrayInputRender : React.StatelessComponent<Props> = ({ label, value, name, onChange, onClickCreate, onClickDelete, error }) => {
    return (
        <React.Fragment>
            {
                value.map((val, idx) => (
                    <div className="form-group" key={`input_array_${idx}`}>
                        <div className={`form-group ${error[idx] === '' ? 'has-success' : 'has-danger'}`}>
                            <div className="input-group-prepend">
                                <span className="input-group-text">{label}-{idx}</span>
                            </div>
                            <input className={`form-control ${error[idx] === '' ? 'is-valid' : 'is-invalid'}`} id={`${idx}`} type="text" value={val} name={name} placeholder={`${label}-${idx}`} onChange={onChange} />
                            {
                                error[idx] !== '' ?
                                    <div className="invalid-feedback">
                                        {error[idx]}
                                    </div> : null
                            }
                            {
                                idx !== 0 ?
                                    <div className="input-group-append">
                                        <button className="btn btn-danger" type="button" onClick={() => onClickDelete(idx)}>삭제</button>
                                    </div> : null
                            }
                        </div>
                    </div>
                ))
            }
            <hr/>
            <div className="text-right">
                <button className="btn btn-primary" type="button" onClick={onClickCreate}>연락처 추가</button>
            </div>
        </React.Fragment>
    )
}

export default ArrayInputRender;