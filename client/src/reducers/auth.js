import { AUTH, LOGOUT, UPDATE_USER, RECOVER_USER, ERROR, CLEAR_ERROR } from "./../Constants/actionTypes";

const initialState = {
    profile: null,
    message: ' '
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, profile: action?.data.result }
        case LOGOUT:
            localStorage.clear();
            return { ...state, profile: null }
        case UPDATE_USER:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }))
            return { ...state, profile: action?.data.result }
        case RECOVER_USER:
            return { ...state, profile: action?.data.result }
        case ERROR:
            return { ...state, message: action.payload }
        case CLEAR_ERROR:
            return { ...state, message: ' ' }
        default:
            return state;
    }
};

export default authReducer;