import * as actionTypes from '../actionTypes';

export const registerSuccess = (response) => {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        token: response.token,
        user: response.user,
    }
}

export const registerFail = () => {
    return {
        type: actionTypes.REGISTER_FAIL,
    }
}

export const loadUser = (response) => {
    return {
        type: actionTypes.LOAD_USER,
        user: response,
    }
}

export const loginSuccess = (response) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: response.token,
        user: response.user,
    }
}

export const loginFail = () => {
    return {
        type: actionTypes.LOGIN_FAIL,
    }
}

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
    }
}