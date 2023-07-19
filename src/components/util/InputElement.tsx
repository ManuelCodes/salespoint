import React from 'react';

interface InputElementInterface  {
    name: string;
    inputSize?: number;
    label: string;
    inputType: string;
    value: string | number | '';
    onChange(event: React.FormEvent<HTMLInputElement>): void;
}

const InputElement: React.FC<InputElementInterface> = (props: InputElementInterface) => {
    const {name, inputSize, label, inputType, value, onChange} = props;
    const inputSizeClass = `col-sm-${inputSize? inputSize:9}`; 
    return (
        <div className="row mb-3">
            <label htmlFor={name} className="col-sm-2 col-form-label">{label}</label>
            <div className={inputSizeClass}>
                <input type={inputType} onChange={onChange} className="form-control" id={name} name={name} value={value}/>
            </div>
        </div>
    )
};

export default InputElement;