import { ActionType } from '../action-types';
import { SaleItemData } from '../../interfaces';

interface SaveSaleItemAction {
    type: ActionType.SALEITEM_CREATE
    payload: SaleItemData;
}

interface SaveSaleItemSuccessAction {
    type: ActionType.SALEITEM_CREATE_SUCCESS;
    payload: SaleItemData;
}

interface SaveSaleItemRedirectAction {
    type: ActionType.SALEITEM_REDIRECT;
}

interface SaveSaleItemErrorAction {
    type: ActionType.SALEITEM_CREATE_ERROR;
    payload: string;
}

interface UpdateSaleItemAction {
    type: ActionType.SALEITEM_UPDATE;
    payload: SaleItemData;
}

interface UpdateSaleItemSuccessAction {
    type: ActionType.SALEITEM_UPDATE_SUCCESS;
    payload: SaleItemData;
}

interface UpdateSaleItemErrorAction {
    type: ActionType.SALEITEM_UPDATE_ERROR;
    payload: string;
}

interface SaleItemsDataAction {
    type: ActionType.SALEITEMS_GET;
    payload: string;
}

interface SaleItemsDataSuccessAction {
    type: ActionType.SALEITEMS_GET_SUCCESS;
    payload: SaleItemData[];
}

interface SaleItemsDataErrorAction {
    type: ActionType.SALEITEMS_GET_ERROR;
    payload: string;
}

interface SaleItemDataAction {
    type: ActionType.SALEITEM_GET;
}

interface SaleItemDataSuccessAction {
    type: ActionType.SALEITEM_GET_SUCCESS;
    payload: SaleItemData;
}

interface SaleItemDataErrorAction {
    type: ActionType.SALEITEM_GET_ERROR;
    payload: string;
}

interface SaleItemDeleteAction {
    type: ActionType.SALEITEM_DELETE;
}

interface SaleItemDeleteSuccessAction {
    type: ActionType.SALEITEM_DELETE_SUCCESS;
    payload: SaleItemData;
}

interface SaleItemDeleteErrorAction {
    type: ActionType.SALEITEM_DELETE_ERROR;
    payload: string;
}

export type Action = SaveSaleItemAction | SaveSaleItemSuccessAction | SaveSaleItemErrorAction | SaveSaleItemRedirectAction | SaleItemsDataAction | SaleItemsDataSuccessAction | SaleItemsDataErrorAction | SaleItemDataAction | SaleItemDataSuccessAction | SaleItemDataErrorAction | UpdateSaleItemAction | UpdateSaleItemSuccessAction | UpdateSaleItemErrorAction | SaleItemDeleteAction | SaleItemDeleteSuccessAction | SaleItemDeleteErrorAction;
