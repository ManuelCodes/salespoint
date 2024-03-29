export enum ActionType {
    /**
     * CLIENT ACTIONS
     */
    CLIENT_CREATE         = 'CLIENT_CREATE',
    CLIENT_CREATE_SUCCESS = 'CLIENT_CREATE_SUCCESS',
    CLIENT_CREATE_ERROR   = 'CLIENT_CREATE_ERROR',
    CLIENT_UPDATE         = 'CLIENT_UPDATE',
    CLIENT_UPDATE_SUCCESS = 'CLIENT_UPDATE_SUCCESS',
    CLIENT_UPDATE_ERROR   = 'CLIENT_UPDATE_ERROR',
    CLIENT_REDIRECT       = 'CLIENT_REDIRECT',
    CLIENTS_GET           = 'CLIENTS_GET',
    CLIENTS_GET_SUCCESS   = 'CLIENTS_GET_SUCCESS',
    CLIENTS_GET_ERROR     = 'CLIENTS_GET_ERROR',
    CLIENT_GET            = 'CLIENT_GET',
    CLIENT_GET_SUCCESS    = 'CLIENT_GET_SUCCESS',
    CLIENT_GET_ERROR      = 'CLIENT_GET_ERROR',
    CLIENT_DELETE         = 'CLIENT_DELETE',
    CLIENT_DELETE_SUCCESS = 'CLIENT_DELETE_SUCCESS',
    CLIENT_DELETE_ERROR   = 'CLIENT_DELETE_ERROR',

    /**
     * SALEITEMS Actions
     */

     SALEITEM_CREATE         = 'SALEITEM_CREATE',
     SALEITEM_CREATE_SUCCESS = 'SALEITEM_CREATE_SUCCESS',
     SALEITEM_CREATE_ERROR   = 'SALEITEM_CREATE_ERROR',
     SALEITEM_UPDATE         = 'SALEITEM_UPDATE',
     SALEITEM_UPDATE_SUCCESS = 'SALEITEM_UPDATE_SUCCESS',
     SALEITEM_UPDATE_ERROR   = 'SALEITEM_UPDATE_ERROR',
     SALEITEM_REDIRECT       = 'SALEITEM_REDIRECT',
     SALEITEMS_GET           = 'SALEITEMS_GET',
     SALEITEMS_GET_SUCCESS   = 'SALEITEMS_GET_SUCCESS',
     SALEITEMS_GET_ERROR     = 'SALEITEMS_GET_ERROR',
     SALEITEM_GET            = 'SALEITEM_GET',
     SALEITEM_GET_SUCCESS    = 'SALEITEM_GET_SUCCESS',
     SALEITEM_GET_ERROR      = 'SALEITEM_GET_ERROR',
     SALEITEM_DELETE         = 'SALEITEM_DELETE',
     SALEITEM_DELETE_SUCCESS = 'SALEITEM_DELETE_SUCCESS',
     SALEITEM_DELETE_ERROR   = 'SALEITEM_DELETE_ERROR'
};