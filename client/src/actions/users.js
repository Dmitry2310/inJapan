import * as api from "../api";
import { SET_USERS, SET_USER, SET_AUTORS, CLEAN_AUTHORS, NOT_AUTHOR, CLEAN_NO_AUTHOR, SEARCHING } from "../Constants/actionTypes";


export const getUsers = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUsers();
        dispatch({ type: SET_USERS, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getUser = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchUser(id);
        dispatch({ type: SET_USER, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const getAuthorBySearch = (searchData) => async (dispatch) => {
    try {
        dispatch({type: SEARCHING, payload: true});
        dispatch({type: CLEAN_NO_AUTHOR});
        const { data } = await api.fetchAuthor(searchData);
        dispatch({ type: SET_AUTORS, payload: data });
        dispatch({type: SEARCHING, payload: false});
    } catch (error) {
        if (error.response.status === 400) {
            dispatch({ type: NOT_AUTHOR, payload: error.response.data.message })
            dispatch({type: SEARCHING, payload: false});
            console.log(error);
        }
    }
};

export const clearAuthors = () => async (dispatch) => {
    try {
        dispatch({ type: CLEAN_AUTHORS });
    } catch (error) {
        console.log(error);
    }
};

export const clearNotification = () => async (dispatch) => {
    try {
        dispatch({ type: CLEAN_NO_AUTHOR });
    } catch (error) {
        console.log(error);
    }
};

