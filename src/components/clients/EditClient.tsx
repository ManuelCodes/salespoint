import React, { useState, useEffect } from 'react';
import Card from '../util/Card';
import InputElement from '../util/InputElement';
import ButtonsGroup from '../util/ButtonsGroup';
import SpinnerModal from '../util/SpinnerModal';
import Alert from '../util/Alert';
import { useNavigate, useParams} from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import _ from 'lodash';

const EditClient: React.FC = () => {

    const { getClient, editClient, initializeClientState } = useActions();
    const [clientData, setData] = useState({
        id: '',
        name: '',
        lastName: '',
        email: '',
    });

    const { data, error, loading, success,updated  } = useTypedSelector(
        (state) => state.clientReducer
    );
    console.log(updated);
    const navigate = useNavigate();
    const { id } = useParams();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        editClient(clientData);
    };

    const cancelEvent = (event:  React.MouseEvent<HTMLButtonElement | MouseEvent> | undefined) => {
        if(event && event.preventDefault) {
            event.preventDefault();
        }
        navigate('/clients');
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...clientData,
            [event.target.name] : event.target.value
        });
    }

    useEffect(() => {
        getClient(id);
        return () => {
            initializeClientState();
        }
    },[]);
    
   useEffect(() => {
    if(updated) {
        navigate('/clients/well done client successfully modified');
    }
   },[updated]);

    useEffect(() => {
        if(!Array.isArray(data) && !_.isEmpty(data)) {
            setData({
                id: data.id!,
                name: data.name,
                lastName: data.lastName,
                email: data.email!
            });
        }
    }, [data]);
    return (
        <div>
            <Card cardHeader="Customer Registration">
                <form onSubmit={onSubmit}>
                    <InputElement inputType='text'  onChange={onChange} label='Name' name='name' value={clientData.name}/>
                    <InputElement inputType='text'  onChange={onChange} label='Last Name' name='lastName'  value={clientData.lastName}/>
                    <InputElement inputType='email' onChange={onChange} label='Email' name='email' value={clientData.email} />
                    <ButtonsGroup  cancelEvent={cancelEvent} />
                </form>
                <Alert classes='alert alert-danger alert-dismissible fade show' message={error} />
                <SpinnerModal showModal={loading} />
            </Card>
        </div>
    );
}

export default EditClient;