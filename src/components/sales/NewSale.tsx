import React, { useEffect, useState } from 'react';
import Card from '../util/Card';
import { ClientData, SaleItemData } from '../../interfaces';
import { AutoComplete } from './AutoComplete';
import { getCLientsSuggestion } from '../../state/action-creators/clientActionCreator';
import { getProductsSuggestion } from '../../state/action-creators/saleItemActionCreator';
import Alert from '../util/Alert';
import InputElement from '../util/InputElement';
import { privateDecrypt } from 'crypto';

/*
export interface SaleItemData {
    //
    id?: string;
    description: string;
    model: string;
    price: number | '';
    stocked: number | '';
}
*/

interface ISale extends SaleItemData {
    quantity: number | string;
    total: number;
}

const NewSale: React.FC = () => {
    const [suggestions, setSuggestions]               = useState<ClientData[]>([]);
    const [productSuggestions, setProductSuggestions] = useState<SaleItemData[]>([]);
    const [value, setValue]                           = useState('');
    const [disabled, setDisabled]                     = useState(false);
    const [productValue, setProductValue]             = useState('');
    const [productDisabled, setProductDisabled]       = useState(false);
    const [client, setClient]                         = useState<ClientData | null>(null);
    const [product, setProduct]                       = useState<SaleItemData>(Object); 
    const [error,setError]                            = useState('');
    const [sales, setSales]                           = useState<ISale[]>([]);

    const populateSuggestions = async (value: string): Promise<ClientData[] | never> => {
        //
        if(value) {
            const result: string | ClientData[] = await getCLientsSuggestion(value);
            if(typeof result === 'string') {
                throw result;
            }else {
                console.log(result);
                setSuggestions(result);
                return result;
            }
        }
        throw 'no value input';
    }

    const populateProductsSuggestions = async (value: string): Promise<SaleItemData[] | never> => {
        //
        if(value) {
            const result: string | SaleItemData[]  = await getProductsSuggestion(value);
            if(typeof result === 'string') {
                throw result;
            }else {
                console.log(result);
                setProductSuggestions(result);
                return result;
            }
        }
        throw 'no value input';
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue, method }) => {
        //
        console.log(event.target.name);
        if(event.target.name === 'product') {
            setProductValue(newValue);
        } else if(event.target.name === 'client') {
            setValue(newValue);
        }
    }

    const onBlur = (event, { highlightedSuggestion }) => {
        //
    }

    const onClick = (event) => {
        console.log(event.target.id);
        if(event.target.id === 'client' ) {
            setValue('');
            setDisabled(false);
            setClient(null);
        }else {
            setProductValue('');
            setProductDisabled(false);
            setProduct(Object);
        }
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>)  => {
        event.preventDefault();
    }

    const onSuggestionSelected = (event: unknown , { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
        console.log('onSuggestionSelected')
        if('name' in suggestion) {
            setClient(suggestion);
            setValue(suggestion.name);
            setDisabled(true);
        }else if('description' in suggestion) {
            setProduct(suggestion);
            setProductValue(suggestion.description);
            setProductDisabled(true);
        }
    }
    const renderSuggestion = (suggestion: ClientData | SaleItemData, { query, isHighlighted }) => {
        console.log('query')
        console.log(query)
        if('name' in suggestion) {
            return <span>{suggestion.name}</span>;
        }
        else if('description' in suggestion) {
            return <span>{suggestion.description}</span>;
        }
    }

    const inputProps = {
        value, // usually comes from the application state
        onChange, // called every time the input value changes
        onBlur, // called when the input loses focus, e.g. when user presses Tab
        type: "text",
        placeholder: "Search Client",
        className: 'form-control',
        id: 'client',
        name: 'client',
        disabled: disabled,
    };

    const inputProductProps = {
        value: productValue, // usually comes from the application state
        onChange, // called every time the input value changes
        onBlur, // called when the input loses focus, e.g. when user presses Tab
        type: "text",
        placeholder: "Search For Product",
        className: 'form-control',
        id: 'product',
        name: 'product',
        disabled: productDisabled
    };

    const addProduct = (event ) => {
        if(client) {
            const total = Number(product.price) * 1;
            let item:ISale = {
                ...product,
                ...{
                    quantity: 1,
                    total: total,
                }
            };
            console.log(item)
            setError('');
            //sales.push(sale);
            setSales([
                 item ,
                ...sales
            ]);
            console.log(sales);
        }else {
            setError('Client must be selected');
        }
    }

    const onQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, paramIndex: number)  => {

        const nextSales = sales.map( (singleSale: ISale, index: number) => {
            if(paramIndex === index) {
                singleSale.quantity = event.target.value;
                const quantity: number = parseInt(event.target.value);
                console.log('antes de los ifs');
                console.log('!isNaN(quantity) ', !isNaN(quantity)  );
                console.log("typeof singleSale.price !== 'string' ", typeof singleSale.price !== 'string'  );
                if(!isNaN(quantity) && singleSale.price && !isNaN(Number(singleSale.price)) ) {
                    console.log('entra los ifs');
                    singleSale.total = (quantity * Number(singleSale.price));
                }
                return singleSale;
                //
            }else {
                return singleSale;
            }
            //
        });
        setSales(nextSales);
    }

    const deleteProduct = (index:number) => {
        setSales([]);
    }
    const renderProducts = () => {
        console.log(sales)
        console.log('sales renderproducts')
        return sales.map( (sale: ISale, index: number) => {
            return (
                <tr key={sale.id}>
                    <th  className='w-25 p-3 text-truncate' scope="row">{sale.description}</th>
                    <td className='w-25 p-3'>{sale.model}</td>
                    <td className='w-25 p-3'>
                        <input type='text' onChange={(event: React.ChangeEvent<HTMLInputElement>) => onQuantityChange(event,index)} className="form-control" id={`name-${sale.id}`} name={`name-${sale.id}`} value={sales[index].quantity} />
                    </td>
                    <td className='w-25 p-3'>{sale.price}</td>
                    <td className='w-25 p-3'>{sale.total}</td>
                    <td>
                        <i className="bi-x-lg" style={{cursor: 'pointer'}}  onClick={() => deleteProduct(index)}></i>
                    </td>
                </tr>
            );
        });
    }
    return <div>
        <Card cardHeader="Sales Registration" cardWidth={9}>
            <form onSubmit={onSubmit}>
                <div className="row">
                    <label htmlFor="client" className="col-3 col-form-label">Client:</label>
                    <div className="col-5">
                        {/*<input type="text" onChange={onChange} className="form-control" id="client" name="client" value="" placeholder='Search Client'/> */}
                         <AutoComplete
                            suggestions={suggestions}
                            populateSuggestions={populateSuggestions}
                            inputProps={inputProps}
                            onSuggestionSelected={onSuggestionSelected}
                            renderSuggestion={renderSuggestion}
                        /> 
                    </div>
                    <div className="col-3">
                        <span className="badge rounded-pill text-bg-light position-relative">
                            { client?
                            (<>
                                {client.name}
                                <span id='client'  onClick={onClick} style={{cursor: 'pointer'}} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">x</span>
                            </> ):
                            ''}
                            
                        </span>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="product" className="col-3 col-form-label">Product:</label>
                    <div className="col-5">
                        <AutoComplete
                            suggestions={productSuggestions}
                            populateSuggestions={populateProductsSuggestions}
                            inputProps={inputProductProps}
                            onSuggestionSelected={onSuggestionSelected}
                            renderSuggestion={renderSuggestion}
                        /> 
                    </div>
                    <div className="col-3">
                        <span className="badge rounded-pill text-bg-light position-relative">
                            { product? (
                                <>
                                    <i onClick={addProduct} className="bi-plus-square-fill add-button-icon"></i>
                                </>):
                            ''}
                            
                        </span>
                    </div>
                    {error && <Alert classes='alert alert-danger alert-dismissible fade show' message={error} onClick={() => setError('')} />}
                    
                </div>
            </form>
        </Card>


        <br/>
            <table style={{margin: 'auto'}} className="table table-hover w-75 p-3">
                <thead>
                    <tr>
                        <th scope="col">Product Description</th>
                        <th scope="col">Model</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Price</th>
                        <th scope="col">Total</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        renderProducts()
                    }
                </tbody>
            </table>
    </div>;
}

export default NewSale;