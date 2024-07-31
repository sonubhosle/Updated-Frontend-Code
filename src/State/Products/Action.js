import { api } from '../../Config/apiConfig.js';
import { 
    FIND_PRODUCT_BY_ID_FAILURE, 
    FIND_PRODUCT_BY_ID_REQUEST, 
    FIND_PRODUCT_BY_ID_SUCCESS, 
    GET_ALL_PRODUCTS_FAILURE, 
    GET_ALL_PRODUCTS_REQUEST, 
    GET_ALL_PRODUCTS_SUCCESS 
} from './ActionTypes.js';



export const findProducts = (reqData = {}) => async (dispatch) => {
    dispatch({ type: GET_ALL_PRODUCTS_REQUEST });

    // Destructure with default values
    const {
        colors ,
        sizes ,
        minPrice ,
        maxPrice ,
        minDiscount,
        category ,
        stock ,
        sort ,
        pageNumber,
        pageSize 
    } = reqData;

    try {
        const { data } = await api.get(`/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&sort=${sort}&category=${category}&stock=${stock}&pageSize=${pageSize}&pageNumber=${pageNumber}`);

        dispatch({ type: GET_ALL_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: GET_ALL_PRODUCTS_FAILURE, payload: error.message });
    }
};

export const findProductsById = (reqData = {}) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

    // Destructure with default values
    const { productId = '' } = reqData;

    try {
        const { data } = await api.get(`/api/products/id/${productId}`);
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
    }
};
