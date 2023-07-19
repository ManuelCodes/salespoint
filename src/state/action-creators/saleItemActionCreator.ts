import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { SaleItemAction } from '../actions';
import { SaleItemData } from '../../interfaces';

const rootUrl = 'http://localhost:3004';

export const saveSaleItem = (saleItemData: SaleItemData) => {
    return async (dispatch: Dispatch<SaleItemAction.Action>) => {
        dispatch({
            type: ActionType.SALEITEM_CREATE,
            payload: saleItemData
        });
        try{
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            const data = await axios.post(`${rootUrl}/products`, saleItemData,  headers);
            dispatch({
                type: ActionType.SALEITEM_CREATE_SUCCESS,
                payload: saleItemData
            });
        }catch (err) {
            console.log(err);
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.SALEITEM_CREATE_ERROR,
                    payload: err.message,
                });
            }
        }
    }
};

export const getSaleItems = (description: string) => {
    return async (dispatch: Dispatch<SaleItemAction.Action>) => {
        dispatch({
            type: ActionType.SALEITEMS_GET,
            payload: description
        });
        try {
            let queryParams = '';
            if(description) {
                queryParams=`?description=${description}`
            }
            const data = await axios.get(`${rootUrl}/products${queryParams}`);
            console.log(data);
            dispatch({
                type: ActionType.SALEITEMS_GET_SUCCESS,
                payload: data.data
            })
        }catch(err) {
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.SALEITEMS_GET_ERROR,
                    payload: err.message
                })
            }
        }
    }
}

export const getSaleItem = (id: string = '') => {
    return async (dispatch: Dispatch<SaleItemAction.Action>) => {
        dispatch({
            type: ActionType.SALEITEM_GET
        });
        if(id === '') {
            dispatch({
                type: ActionType.SALEITEM_GET_ERROR,
                payload: 'id value is required'
            });
        }
        try {
            const data = await axios.get(`${rootUrl}/products/${id}`);
            dispatch({
                type: ActionType.SALEITEM_GET_SUCCESS,
                payload: data.data
            })
        }catch(err) {
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.SALEITEMS_GET_ERROR,
                    payload: err.message
                })
            }
        }
    }
}

export const getProductsSuggestion = async (name: string): Promise<SaleItemData[] | string>  => {
    let error = '';
    try {
        const result = await axios.get(`${rootUrl}/products?description_like=${name}`);
        return result.data;
    }catch(err) {
        if(err instanceof Error) {
            error = err.message;
        }
    }
    return error;
}

export const editSaleItem = (saleItemData: SaleItemData) => {
    return async (dispatch: Dispatch<SaleItemAction.Action>) => {
        dispatch({
            type: ActionType.SALEITEM_UPDATE,
            payload: saleItemData
        });
        try {
            const headers = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            //const data = await axios.patch(`${rootUrl}/client/edit`, clientData,  headers);
            await axios.patch(`${rootUrl}/products/${saleItemData.id}`, saleItemData, headers);
            dispatch({
                type: ActionType.SALEITEM_UPDATE_SUCCESS,
                payload: saleItemData
            })
        }catch(err){
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.SALEITEM_UPDATE_ERROR,
                    payload: err.message
                })
            }
        }
    }
}

export const deleteSaleItem = (id: string) => {
    return async (dispatch: Dispatch<SaleItemAction.Action>) => {
        dispatch({
            type: ActionType.SALEITEM_DELETE,
            payload: id
        });
        const headers = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        try {
            await axios.delete(`${rootUrl}/products/${id}`, headers);
            dispatch({
                type: ActionType.SALEITEM_DELETE_SUCCESS,
                payload: <SaleItemData> {}
            });
        }catch(err) {
            if (err instanceof Error) {
                dispatch({
                    type: ActionType.SALEITEM_DELETE_ERROR,
                    payload: err.message
                })
            }
        }
    }
}

export const  initializeSaleItemState = () => {
    return (dispatch: Dispatch<SaleItemAction.Action>) => {
        dispatch({
            type: ActionType.SALEITEM_REDIRECT
        });
        
    }
}