import * as React from 'react';

const TextRender = (field : any) => {
    const hasError = !!field.meta.error && !!field.meta.touched;

    return (
        <div className={!hasError ? 'form-group' : 'form-group has-error'}>
            <label className="col-sm-2 control-label" htmlFor={field.input.name}>{field.label}</label>
            <div className="col-sm-10">
                <input {...field.input} type={field.type} placeholder={field.placeholder} className="form-control" />
                {hasError && <span className="help-block">{field.meta.error}</span>}
            </div>
        </div>
    );
};

export default TextRender;