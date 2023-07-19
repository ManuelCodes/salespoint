import { ClientData } from '../../interfaces';
import { ActionType } from '../action-types';
import { ClientAction } from '../actions';

interface ClientState {
    loading: boolean;
    error: string | null;
    data: ClientData | ClientData[];
    success: boolean,
    updated?: boolean
}

const initialState = {
    loading: false,
    error: null,
    data: <ClientData>{},
    success: true
}

export const clientReducer = (
    state: ClientState = initialState, action: ClientAction.Action): ClientState => {
    switch(action.type) {
        case ActionType.CLIENT_CREATE:
            return { loading: true, error: null, data: action.payload, success: false};
        case ActionType.CLIENT_CREATE_SUCCESS:
            return { loading: false, error: null, data: action.payload, success: true };
        case ActionType.CLIENT_CREATE_ERROR:
            return { loading: false, error: action.payload, data: <ClientData>{}, success: false  };
        case ActionType.CLIENT_REDIRECT:
            return { loading: false, error: null, data: <ClientData>{}, success: false  };
        case ActionType.CLIENTS_GET:
            return { loading: true, error: null, data: action.payload, success: false };
        case ActionType.CLIENTS_GET_SUCCESS:
            return { loading: false, error: null, data: action.payload, success: true };
        case ActionType.CLIENTS_GET_ERROR:
            return { loading: false, error: action.payload, data:[], success: false };
        case ActionType.CLIENT_GET:
            return { loading: true, error: null, data: <ClientData>{}, success: false};
        case ActionType.CLIENT_GET_SUCCESS:
            return { loading: false, error: null, data: action.payload, success: true };
        case ActionType.CLIENT_GET_ERROR:
            return { loading: false, error: action.payload, data:[], success: false};
        case ActionType.CLIENT_UPDATE:
            return { loading: true, error: null, data: action.payload, success: false};
        case ActionType.CLIENT_UPDATE_SUCCESS:
            return { loading: false, error: null, data: action.payload, success: true, updated: true};
        case ActionType.CLIENT_UPDATE_ERROR:
            return { loading: false, error: action.payload, data: <ClientData>{}, success: false  };
        case ActionType.CLIENT_DELETE:
            return { loading: true, error: null, data: <ClientData>{}, success: false};
        case ActionType.CLIENT_DELETE_SUCCESS:
            return { loading: false, error: null, data: <ClientData>{}, success: true, updated: true};
        case ActionType.CLIENT_DELETE_ERROR:
            return { loading: false, error: action.payload, data: <ClientData>{}, success: false  };
        default:
            return state;
    }
};
