import { SET_USERS, SET_USER, SET_AUTORS, CLEAN_AUTHORS, NOT_AUTHOR, CLEAN_NO_AUTHOR, SEARCHING } from "../Constants/actionTypes";

const initialState = {
    someUser: null,
    users: [],
    authors: [],
    message: ' ',
    isSearching: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, users: action.payload }
        case SET_USER:
            return { ...state, someUser: action?.payload.result }
        case SET_AUTORS:
            return { ...state, authors: action?.payload.result}
        case CLEAN_AUTHORS:
            return { ...state, authors: []}
        case NOT_AUTHOR:
            return { ...state, message: action.payload }
        case CLEAN_NO_AUTHOR:
            return { ...state, message: ' ' }
        case SEARCHING:
            return { ...state, isSearching: action.payload}
        default:
            return state;
    }
};

export default userReducer;