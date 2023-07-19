import React, { useState, useEffect } from 'react';
import Card from '../util/Card';
import InputElement from '../util/InputElement';
import ButtonsGroup from '../util/ButtonsGroup';
import SpinnerModal from '../util/SpinnerModal';
import Alert from '../util/Alert';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { useNavigate} from 'react-router-dom';
import _ from 'lodash';

const NewClient: React.FC = () => {

    const { saveClient, initializeClientState } = useActions();
    const { data, error, loading, success  } = useTypedSelector(
        (state) => state.clientReducer
    );
    const [clientData, setData] = useState({
        name: '',
        lastName: '',
        email: '',
    });
    
    const navigate = useNavigate();
    useEffect(() => {
        if(!_.isEmpty(data) && !error && !loading && success ) {
            navigate('/clients/well done client saved successfully');
        }
    });

    useEffect(() => {
        return () => {
            initializeClientState();
        }
    },[])

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveClient(clientData);
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

export default NewClient;