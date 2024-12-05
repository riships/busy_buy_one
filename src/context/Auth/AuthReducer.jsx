import {
    CLEAR_ERROR_MESSAGE,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    SET_AUTH_USER,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    TOGGLE_LOADING
} from "./types";


const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: false,
                loading: false
            }
        case LOGOUT:
            return {
                user: null,
                error: false,
                message: action.payload,
                loading: false
            }
        case LOGIN_FAIL:
            return {
                user: null,
                error: true,
                message: action.payload,
                loading: false
            }
        case SET_AUTH_USER:
            return {
                ...state,
                user: action.payload
            }
        case CLEAR_ERROR_MESSAGE:
            return {
                ...state,
                error: false,
                message: ''
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: false,
                loading: false,
            }
        case SIGNUP_FAIL:
            return {
                ...state,
                error: true,
                message: action.payload,
                loading: false,
            };
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading,
            };
        default:
            return state
    }
}


export default AuthReducer; 