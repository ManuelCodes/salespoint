import { ActionType } from '../action-types';
import { ClientData } from '../../interfaces';

interface SaveClientAction {
    type: ActionType.CLIENT_CREATE;
    payload: ClientData;
}

interface SaveClientSuccessAction {
    type: ActionType.CLIENT_CREATE_SUCCESS;
    payload: ClientData;
}

interface SaveClientRedirectAction {
    type: ActionType.CLIENT_REDIRECT;
}

interface SaveClientErrorAction {
    type: ActionType.CLIENT_CREATE_ERROR;
    payload: string;
}

interface UpdateClientAction {
    type: ActionType.CLIENT_UPDATE;
    payload: ClientData;
}

interface UpdateClientSuccessAction {
    type: ActionType.CLIENT_UPDATE_SUCCESS;
    payload: ClientData;
}
/*
interface UpdateClientRedirectAction {
    type: ActionType.CLIENT_REDIRECT;
}*/

interface UpdateClientErrorAction {
    type: ActionType.CLIENT_UPDATE_ERROR;
    payload: string;
}

interface ClientsDataAction {
    type: ActionType.CLIENTS_GET;
    payload: ClientData;
}

interface ClientsDataSuccessAction {
    type: ActionType.CLIENTS_GET_SUCCESS;
    payload: ClientData[];
}

interface ClientsDataErrorAction {
    type: ActionType.CLIENTS_GET_ERROR;
    payload: string;
}

interface ClientDataAction {
    type: ActionType.CLIENT_GET;
}

interface ClientDataSuccessAction {
    type: ActionType.CLIENT_GET_SUCCESS;
    payload: ClientData;
}

interface ClientDataErrorAction {
    type: ActionType.CLIENT_GET_ERROR;
    payload: string;
}

interface ClientDeleteAction {
    type: ActionType.CLIENT_DELETE;
}

interface ClientDeleteSuccessAction {
    type: ActionType.CLIENT_DELETE_SUCCESS;
    payload: ClientData;
}

interface ClientDeleteErrorAction {
    type: ActionType.CLIENT_DELETE_ERROR;
    payload: string;
}

export type Action = SaveClientAction | SaveClientSuccessAction | SaveClientErrorAction | SaveClientRedirectAction | ClientsDataAction | ClientsDataSuccessAction | ClientsDataErrorAction | ClientDataAction | ClientDataSuccessAction | ClientDataErrorAction | UpdateClientAction | UpdateClientSuccessAction | UpdateClientErrorAction | ClientDeleteAction | ClientDeleteSuccessAction | ClientDeleteErrorAction;