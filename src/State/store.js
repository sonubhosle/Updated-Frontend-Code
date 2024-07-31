import {applyMiddleware,legacy_createStore,combineReducers} from 'redux'
import { thunk } from 'redux-thunk';
import { customerProductReducer } from './Products/Reducer';
import { authReducer } from './Auth/Reducer';
import { cartReducer } from './Cart/Reducer';
import { orderReducer } from './Order/Reducer';

const rootReducers = combineReducers({
    auth:authReducer,
    products:customerProductReducer,
    cart:cartReducer,
    order:orderReducer,
})


export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));