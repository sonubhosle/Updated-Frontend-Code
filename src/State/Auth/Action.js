import { API_BASE_URL } from '../../Config/apiConfig';
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE
} from './ActionTypes';
import axios from 'axios';

// Action Creators
const registerRequest = () => ({ type: REGISTER_USER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_USER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_USER_FAILURE, payload: error });

const loginRequest = () => ({ type: LOGIN_USER_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_USER_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_USER_FAILURE, payload: error });

const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

// Helper function to save JWT
const saveJwt = (jwt) => {
    localStorage.setItem("jwt", jwt);
};

// Thunk actions
export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;

        if (user.jwt) {
            saveJwt(user.jwt);
            dispatch(registerSuccess(user));
        } else {
            dispatch(registerFailure('Email Already Exist'));
        }
    } catch (error) {
        dispatch(registerFailure(error.response?.data?.message || 'Email Already Exist'));
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = response.data;

        if (user.jwt) {
            saveJwt(user.jwt);
            dispatch(loginSuccess(user));
        } else {
            dispatch(loginFailure('Login failed'));
        }
    } catch (error) {
        dispatch(loginFailure(error.response?.data?.message || 'Email or password is incorrect'));
    }
};

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        const user = response.data;
        dispatch(getUserSuccess(user));
    } catch (error) {
        dispatch(getUserFailure(error.response?.data?.message || 'Failed to fetch user data'));
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.clear();
};
