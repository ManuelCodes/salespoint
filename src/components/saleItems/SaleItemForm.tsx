import React, { useState, useEffect } from 'react';
import InputElement from '../util/InputElement';

interface ISaleItemForm {
    onSubmit (event: React.FormEvent<HTMLFormElement>): void;
    onChange (event: React.ChangeEvent<HTMLInputElement>): void;
    description: string;
}

const SaleItemForm:React.FC<ISaleItemForm> = (props: ISaleItemForm) => {

    const { onSubmit, onChange,description } = props;

    return (
    <form onSubmit={onSubmit} >
        <InputElement inputType='text' onChange={onChange} label='Description' name='description' value={description}/>
        <div className='float-end'>
            <button type="submit" className="btn btn-primary me-1">
                Search
            </button>
        </div>
    </form>);
}

export default SaleItemForm;