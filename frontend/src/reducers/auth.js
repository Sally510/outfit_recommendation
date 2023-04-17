import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL, 
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    LOGOUT
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    error: null,
};

export default function Auth (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            localStorage.removeItem('error');
            return{
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)
            localStorage.removeItem('error');
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            localStorage.removeItem('error');
            return {
                ...state,
                isAuthenticated: false,
                error: null,
            }
        
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case AUTHENTICATED_FAIL:
            console.log(payload);
            return{
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            console.log(payload);
            return {
                ...state,
                user: null,
            }

        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh'); 
            console.log(payload);           
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                error: payload.detail,
            }
        case SIGNUP_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh'); 
            localStorage.removeItem('error');
            const passwordErrors = payload.password;
            const emailErrors = payload.email;
            const nonFieldErrors = payload.non_field_errors;
            const errors = [];
            if (passwordErrors) {
                errors.push(...passwordErrors); 
            }
            if (emailErrors) {
                errors.push(...emailErrors);
            }
            if (nonFieldErrors) {
                errors.push(...nonFieldErrors);
            }
            const errorString = errors.join('\n'); 
            if (!errorString) {
                return {
                    ...state,
                    access: null,
                    refresh: null,
                    isAuthenticated: false,
                    user: null,
                }
            }
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                error: errorString,
            }
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');    
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
};