import React, {useState} from "react";
import SaleItemList from "./SaleItemList";
import SaleItemForm from './SaleItemForm';
import Alert from '../util/Alert';
import Card from '../util/Card';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ResponsiveButton from '../util/ResponsiveButton';
import { useNavigate,useParams } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';

import SpinnerModal from '../util/SpinnerModal';
import Modal from '../util/Modal';

const ProductListContainer: React.FC = () => {

    const [description, setDescription] = useState('');
    const [showModal, setShowModal] = useState(false);
    let { message } = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const { data, error, loading, success  } = useTypedSelector(
        (state) => state.saleItemReducer
    );
    console.log('data')
    console.log(data);
    const { initializeSaleItemState, getSaleItems, deleteSaleItem } = useActions();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getSaleItems(description);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    }
    const newSaleItem = () => {
        initializeSaleItemState();
        navigate('/saleitem/new');
    }

    const openConfirmDialog = (id) => {
        setShowModal(true);
        setId(id);
    }


    const modalPrimaryButtonClick = () =>{
        setShowModal(false);
        deleteSaleItem(id);
    }

    
    return (
        <div>
            <Alert classes='alert alert-success alert-dismissible fade show' message={message} />
            <Alert classes='alert alert-danger alert-dismissible fade show' message={error} />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 bg-light text-right">
                        <ResponsiveButton buttonClass="btn btn-primary" onClick={newSaleItem} buttonText="New Product" icon='bi-plus-square-fill add-button-icon' />
                    </div>
                </div>
            </div>
            <br />
            <Card cardHeader='Articles' >
                <SaleItemForm description={description} onChange={onChange} onSubmit={onSubmit}  />
            </Card>
            <br />
            <SaleItemList data={data} error={error} loading success  openConfirmDialog={openConfirmDialog}/>

            <SpinnerModal showModal={loading} />
            <Modal
                showModal={showModal}
                text="Are you sure you want to delete this Item?"
                primaryButtonText='Yes'
                primaryButtonClickEvent={modalPrimaryButtonClick}
                secondaryButtonClickEvent={() => setShowModal(false)}
                secondaryButtonText='No'
                title='Warning'
            />
        </div>
    );
};

export default ProductListContainer;