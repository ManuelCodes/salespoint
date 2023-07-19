import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { ClientAction } from '../actions';
import { ClientData } from '../../interfaces';
import { constant } from 'lodash';

//const rootUrl = 'https://225wdzz0sg.execute-api.us-east-1.amazonaws.com';
const rootUrl = 'http://localhost:3004';

export const saveClient = (clientData: ClientData) => {
    return async (dispatch: Dispatch<ClientAction.Action>) => {
        dispatch({
            type: ActionType.CLIENT_CREATE,
            payload: clientData
        });
        try{
            //https://225wdzz0sg.execute-api.us-east-1.amazonaws.com/clients
            //const {data} = await axios.get('https://225wdzz0sg.execute-api.us-east-1.amazonaws.com/clients');
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            //const data = await axios.post(`${rootUrl}/client/new`, clientData,  headers);
            const data = await axios.post(`${rootUrl}/clients`, clientData,  headers);
            dispatch({
                type: ActionType.CLIENT_CREATE_SUCCESS,
                payload: clientData
            });
        }catch (err) {
            if (err instanceof Error) {
                await dispatch({
                    type: ActionType.CLIENT_CREATE_ERROR,
                    payload: err.message,
                });
            }
        }
    }
};

export const getClients = (clientData: ClientData) => {
    return async (dispatch: Dispatch<ClientAction.Action>) => {
        dispatch({
            type: ActionType.CLIENTS_GET,
            payload: clientData
        });
        try {
            let queryParams = '';
            if(clientData.name && clientData.lastName) {
                queryParams = `?firstName=${clientData.name}&lastName=${clientData.lastName}`;
            }
            else if(clientData.name) {
                queryParams = `?firstName=${clientData.name}`;
            }
            else if(clientData.lastName) {
                queryParams = `?lastName=${clientData.lastName}`;
            }
            const data = await axios.get(`${rootUrl}/clients${queryParams}`);
            dispatch({
                type: ActionType.CLIENTS_GET_SUCCESS,
                payload: data.data
            });
        }catch(err) {
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.CLIENTS_GET_ERROR,
                    payload: err.message
                })
            }
        }
    }
}

export const getClient = (id: string = '') => {
    return async (dispatch: Dispatch<ClientAction.Action>) => {
        dispatch({
            type: ActionType.CLIENT_GET
        });
        if(id === '') {
            dispatch({
                type: ActionType.CLIENT_GET_ERROR,
                payload: 'id value is required'
            });
            return;
        }
        try {
            const data = await axios.get(`${rootUrl}/client/${id}`);
            dispatch({
                type: ActionType.CLIENT_GET_SUCCESS,
                payload: data.data.Item
            });
        }catch(err) {
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.CLIENT_GET_ERROR,
                    payload: err.message
                })
            }
        }
    }
}

export const getCLientsSuggestion = async (name: string): Promise<ClientData[] | string>  => {
    let error = '';
    try {
        const result = await axios.get(`${rootUrl}/clients?name_like=${name}`);
        return result.data;
    }catch(err) {
        if(err instanceof Error) {
            error = err.message;
        }
    }
    return error;
}
    

export const editClient = (clientData: ClientData) => {
    return async (dispatch: Dispatch<ClientAction.Action>) => {
        dispatch({
            type: ActionType.CLIENT_UPDATE,
            payload: clientData
        });
        try{
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const data = await axios.patch(`${rootUrl}/client/edit`, clientData,  headers);
            dispatch({
                type: ActionType.CLIENT_UPDATE_SUCCESS,
                payload: clientData
            });
        }catch (err) {
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.CLIENT_UPDATE_ERROR,
                    payload: err.message
                });
            }
        }
    }
}

export const deleteClient = (id: string) => {
    return async (dispatch: Dispatch<ClientAction.Action>) => {
        dispatch({
            type: ActionType.CLIENT_DELETE
        });
        try{
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const data = await axios.delete(`${rootUrl}/client/${id}`,  headers);
            dispatch({
                type: ActionType.CLIENT_DELETE_SUCCESS,
                payload: <ClientData> {}
            })
        }catch(err) {
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.CLIENT_DELETE_ERROR,
                    payload: err.message
                })
            }
        }
    }
}

export const  initializeClientState = () => {
    return (dispatch: Dispatch<ClientAction.Action>) => {
        dispatch({
            type: ActionType.CLIENT_REDIRECT
        });
        
    }
}
