import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import InputElement from '../util/InputElement';
import Card from '../util/Card';
import ResponsiveButton from '../util/ResponsiveButton';
import Alert from '../util/Alert';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import '../../css/Buttons.css';
import { ClientData } from '../../interfaces';
import SpinnerModal from '../util/SpinnerModal';
import Modal from '../util/Modal';

const ClientList: React.FC = () => {

    const { getClients, deleteClient, initializeClientState } = useActions();

    const { data, error, loading, success  } = useTypedSelector(
        (state) => state.clientReducer
    );

    const [clientData, setData] = useState({
        name: '',
        lastName: '',
        email: '',
    });

    const [id, setId] = useState('');

    const [showModal, setShowModal] = useState(false);
    let { message } = useParams();
    
    const newCLient = (event: React.FormEvent<HTMLButtonElement>) => {
        initializeClientState();
        navigate('/client/new');
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...clientData,
            [event.target.name] : event.target.value
        });
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        getClients(clientData);
    }

    const edit = (id) => {
        initializeClientState();
        navigate(`/client/edit/${id}`)
    }

    const openConfirmDialog = (id) => {
        setShowModal(true);
        setId(id);
    }

    const clientList = (data: ClientData[] | ClientData)  => {
        if(!error && !loading && success && data instanceof Array) {
            console.log('this way')
            return data.map( (clientData: ClientData) =>{
                return (
                    <tr key={clientData.id}>
                        <th  className='w-25 p-3 text-truncate' scope="row">{clientData.id}</th>
                        <td className='w-25 p-3'>{clientData.name}</td>
                        <td className='w-25 p-3'>{clientData.lastName}</td>
                        <td className='w-25 p-3'>{clientData.email}</td>
                        <td>
                            <i className="bi-pencil me-2" style={{cursor: 'pointer'}} onClick={() => edit(clientData.id)} ></i>
                            <i className="bi-trash" style={{cursor: 'pointer'}} onClick={() => openConfirmDialog(clientData.id)} ></i>
                        </td>
                    </tr>
                )
            });
        }
    }

    const modalPrimaryButtonClick = () =>{
        setShowModal(false);
        deleteClient(id);
    }

    const navigate = useNavigate();
    return (
        <div>
            <Alert classes='alert alert-success alert-dismissible fade show' message={message} />
            <Alert classes='alert alert-danger alert-dismissible fade show' message={error} />
            <div className="container">
                <div className="row">
                    <div className="col-md-12 bg-light text-right">
                        <ResponsiveButton buttonClass="btn btn-primary" onClick={newCLient} buttonText="New CLient" icon='bi-plus-square-fill add-button-icon' />
                    </div>
                </div>
            </div>
            <br />
            <Card cardHeader='Clients' >
                <form onSubmit={onSubmit} >
                    <InputElement inputType='text' onChange={onChange} label='Name' name='name' value={clientData.name}/>
                    <InputElement inputType='text' onChange={onChange} label='Last Name' name='lastName'  value={clientData.lastName}/>
                    <div className='float-end'>
                        <button type="submit" className="btn btn-primary me-1">
                            Search
                        </button>
                    </div>
                </form>
            </Card>

            <br/>
            <table style={{margin: 'auto'}} className="table table-hover w-75 p-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        clientList(data)
                    }
                </tbody>
            </table>
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
    
}

export default ClientList;

