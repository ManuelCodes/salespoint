import { SaleItemData } from '../../interfaces';
import { ActionType } from '../action-types';
import { SaleItemAction } from '../actions';

interface SaleItemState {
    loading: boolean;
    error: string | null;
    data: SaleItemData | SaleItemData[] | string;
    success: boolean,
    updated?: boolean
}

const initialState = {
    loading: false,
    error: null,
    data: <SaleItemData>{},
    success: true
}

export const saleItemReducer = (state: SaleItemState = initialState, action: SaleItemAction.Action): SaleItemState => {

    switch(action.type) {
        case ActionType.SALEITEM_CREATE:
            return { loading: true, error: null, data: action.payload, success: false};
        case ActionType.SALEITEM_CREATE_SUCCESS:
            return { loading: false, error: null, data: action.payload, success: true };
        case ActionType.SALEITEM_CREATE_ERROR:
            return { loading: false, error: action.payload, data: <SaleItemData>{}, success: false  };
        case ActionType.SALEITEM_REDIRECT:
            return { loading: false, error: null, data: <SaleItemData>{}, success: false  };
        case ActionType.SALEITEMS_GET:
            return { loading: true, error: null, data: action.payload, success: false };
        case ActionType.SALEITEMS_GET_SUCCESS: 
            return { loading: false, error: null, data: action.payload, success: true };
        case ActionType.SALEITEM_GET:
            return { loading: true, error: null, data: <SaleItemData>{}, success: false};
        case ActionType.SALEITEM_GET_SUCCESS:
            return { loading: false, error: null, data: action.payload, success: true };
        case ActionType.SALEITEM_GET_ERROR:
            return { loading: false, error: action.payload, data:[], success: false};
        case ActionType.SALEITEM_UPDATE:
            return { loading: true, error: null, data: action.payload, success: false};
        case ActionType.SALEITEM_UPDATE_SUCCESS:
            return { loading: false, error: null, data: action.payload, success: true, updated: true};
        case ActionType.SALEITEM_UPDATE_ERROR:
            return { loading: false, error: action.payload, data: <SaleItemData>{}, success: false  };
        case ActionType.SALEITEM_DELETE:
            return { loading: true, error: null, data: <SaleItemData>{}, success: false};
        case ActionType.SALEITEM_DELETE_SUCCESS:
            return { loading: false, error: null, data: <SaleItemData>{}, success: true, updated: true};
        case ActionType.SALEITEM_DELETE_ERROR:
            return { loading: false, error: action.payload, data: <SaleItemData>{}, success: false  };
        default:
            return state;
    }
}