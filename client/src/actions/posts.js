import * as api from "../api";
import { FETCH_POST, FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, COMMENT, FETCH_USERS_POSTS, CLEAR_POST, IS_FETCHING } from "./../Constants/actionTypes";

// Action creators

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);
        const action = { type: FETCH_ALL, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const getUserPosts = (userId) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchUsersPosts(userId);
        const action = { type: FETCH_USERS_POSTS, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post, selectedImage, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const formData = new FormData();
        formData.append('coverImage', selectedImage);
        formData.append('postTitle', post.title);
        formData.append('postMessage', post.message);
        formData.append('postTags', post.tags);
        formData.append('postVideo', post.selectedVideo);
        const { data } = await api.createPost(formData);
        dispatch({ type: CREATE, payload: data });
        navigate(`/posts/${data._id}`);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const updatePost = (id, post, selectedImage, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const formData = new FormData();
        formData.append('postTitle', post.title);
        formData.append('postMessage', post.message);
        formData.append('postTags', post.tags);
        formData.append('postVideo', post.selectedVideo);
        formData.append('coverFile', post.selectedFile);

        if (selectedImage !== '') {
            formData.append('coverImage', selectedImage);
        }
        const { data } = await api.updatePost(id, formData);
        const action = { type: UPDATE, payload: data };
        dispatch(action);
        navigate(`/posts/${data._id}`);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const clearPost = () => async (dispatch) => {
    try {
        dispatch({ type: CLEAR_POST, payload: '' });
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        dispatch({ type: COMMENT, payload: data });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: IS_FETCHING, payload: true });
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: IS_FETCHING, payload: false });
    } catch (error) {
        console.log(error);
    }
};