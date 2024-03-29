import axios from "axios";

export const baseURL = 'https://injapan.onrender.com';

const API = axios.create({
    baseURL
});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchUsersPosts = (id) => API.get(`/posts/userPosts/${id}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (post) => API.post('/posts', post);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, postData) => API.post(`/posts/${id}`, postData);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const fetchUsers = () => API.get('/user');
export const fetchUser = (id) => API.get(`/user/${id}`);
export const updateUser = (id, formData) => API.patch(`/user/update/${id}`, formData);
export const fetchAuthor = (formData) => API.post(`/user/find`, { formData });