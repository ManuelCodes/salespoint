import { clientReducer } from './clientReducer';
import { saleItemReducer } from './saleItemReducer'; 
import { combineReducers } from 'redux';




const combinedReducers = combineReducers({
    clientReducer: clientReducer,
    saleItemReducer: saleItemReducer
});


export default combinedReducers;