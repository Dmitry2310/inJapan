import * as api from "../api";
import { AUTH, UPDATE_USER, RECOVER_USER, ERROR, CLEAR_ERROR } from "./../Constants/actionTypes";

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_ERROR});
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        if (error.response.status === 400) {
            dispatch({type: ERROR, payload: error.response.data.message})
        }
        console.log(error);
    }
};

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        dispatch({type: CLEAR_ERROR});
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        if (error.response.status === 400) {
            dispatch({type: ERROR, payload: error.response.data.message})
        }
        console.log(error);
    }
};

export const updateUser = (id, formData) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, formData);
        const action = { type: UPDATE_USER, data };
        localStorage.clear();
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
};

export const updateAvatar = (selectedImage) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('avatar', selectedImage);
        const { data } = await api.uploadAvatar(formData);
        const action = { type: UPDATE_USER, data };
        localStorage.clear();
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
};

export const recoverUser = () => async (dispatch) => {
    try {
        const data = JSON.parse(localStorage.getItem('profile'));
        const action = { type: RECOVER_USER, data };
        dispatch(action);
    } catch (error) {
        console.log(error);
    }
};