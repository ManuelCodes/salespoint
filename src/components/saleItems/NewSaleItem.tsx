import React, { useState, useEffect } from 'react';
import Card from '../util/Card';
import InputElement from '../util/InputElement';
import ButtonsGroup from '../util/ButtonsGroup';
import { SaleItemData } from '../../interfaces';
import SpinnerModal from '../util/SpinnerModal';
import Alert from '../util/Alert';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { useNavigate} from 'react-router-dom';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid'


const NewSaleItem: React.FC = () => {

    const [saleItemData, setSaleItemData] = useState<SaleItemData>({
        id: uuidv4(),
        description: '',
        model: '',
        price: '',
        stocked: ''
    });

    const { saveSaleItem, initializeSaleItemState } = useActions();

    const { data, error, loading, success  } = useTypedSelector(
        (state) => state.saleItemReducer
    );

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSaleItemData({
            ...saleItemData,
            [event.target.name] : event.target.value
        });
    }

    const cancelEvent = () => {
        navigate('/saleitems')
    }

    const navigate = useNavigate();
    useEffect(() => {
        if(!_.isEmpty(data) && !error && !loading && success ) {
            navigate('/saleitems/well done product saved successfully');
        }
    });

    useEffect(() => {
        return () => {
            initializeSaleItemState();
        }
    },[])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        saveSaleItem(saleItemData);
    }
    return <div>
        <Card cardHeader="SaleItem Registration">
            <form onSubmit={onSubmit}>
                <InputElement inputType='text' onChange={onChange} label='Description' name='description' value={saleItemData.description}/>
                <InputElement inputType='text' onChange={onChange} label='Model' name='model' value={saleItemData.model}/>
                <InputElement inputType='text' onChange={onChange} label='Price' name='price' value={saleItemData.price}  inputSize={4}/>
                <InputElement inputType='text' onChange={onChange} label='Stock' name='stocked' value={saleItemData.stocked} inputSize={3} />
                <input type="hidden" value={saleItemData.id} />
                <ButtonsGroup  cancelEvent={cancelEvent} />
            </form>
            <Alert classes='alert alert-danger alert-dismissible fade show' message={error} />
            <SpinnerModal showModal={loading} />
        </Card>
    </div>;
}


export default NewSaleItem;