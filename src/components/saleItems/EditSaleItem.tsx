import React, {useEffect, useState} from "react";
import { useNavigate, useParams} from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { SaleItemData } from '../../interfaces';
import Card from '../util/Card';
import InputElement from '../util/InputElement';
import ButtonsGroup from '../util/ButtonsGroup';
import SpinnerModal from '../util/SpinnerModal';
import Alert from '../util/Alert';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import _ from 'lodash';

const EditSaleItem:React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getSaleItem, initializeSaleItemState, editSaleItem }  = useActions();
    const [ saleItem, setSaleItem ] = useState<SaleItemData>({
        id: '',
        description: '',
        model: '',
        price: '',
        stocked: ''
    });
    const { data, error, loading, success,updated  } = useTypedSelector(
        (state) => state.saleItemReducer
    );
    useEffect(() => {
        getSaleItem(id);
        return () => {
            initializeSaleItemState();
        }
    },[]);

    useEffect(() => {
        if(!Array.isArray(data) && !_.isEmpty(data)) {
           /**  Code below also works, however vscode thinks that's an error,
              * casted data as SaleItem to get rid of the annoying red underline that vscode marks
                setSaleItem({
                    id: data.id,
                    description: data.description,
                    model: data.model,
                    price: data.price,
                    stocked: data.stocked
                });
            */
            const item = data as SaleItemData;


            setSaleItem({
                id: item.id,
                description: item.description,
                model: item.model,
                price: item.price,
                stocked: item.stocked
            });

             
        }
    }, [data]);

    useEffect(() => {
        if(updated) {
            navigate('/saleitems/well done product successfully modified');
        }
    },[updated]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSaleItem({
            ...saleItem,
            [event.target.name] : event.target.value
        });
    }

    const cancelEvent = () => {
        navigate('/saleitems')
    }

    const onSubmit =  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        editSaleItem(saleItem);
    }

    return <div>
        <Card cardHeader="SaleItem Registration">
            <form onSubmit={onSubmit}>
            <InputElement inputType='text' onChange={onChange} label='Description' name='description' value={saleItem.description}/>
                <InputElement inputType='text' onChange={onChange} label='Model' name='model' value={saleItem.model}/>
                <InputElement inputType='text' onChange={onChange} label='Price' name='price' value={saleItem.price}  inputSize={4}/>
                <InputElement inputType='text' onChange={onChange} label='Stock' name='stocked' value={saleItem.stocked} inputSize={3} />
                <input type="hidden" value={saleItem.id} />
                <ButtonsGroup  cancelEvent={cancelEvent} />
            </form>
            <Alert classes='alert alert-danger alert-dismissible fade show' message={error} />
            <SpinnerModal showModal={loading} />
        </Card>
    </div>
}

export default EditSaleItem;