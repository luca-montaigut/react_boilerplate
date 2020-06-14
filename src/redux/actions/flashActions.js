import * as actionTypes from '../actionTypes';

export const flashSuccess = (message) => {
    return {
        type: actionTypes.FLASH_SUCCESS,
        category: "success",
        title: "Bonne nouvelle !",
        content: message,
    }
}

export const flashInfo = (message) => {
    return {
        type: actionTypes.FLASH_INFO,
        category: "info",
        title: "Info",
        content: message,
    }
}

export const flashWarning = (message) => {
    return {
        type: actionTypes.FLASH_WARNING,
        category: "warning",
        title: "Attention",
        content: message,
    }
}

export const flashError = (message) => {
    return {
        type: actionTypes.FLASH_ERROR,
        category: "danger",
        title: "Erreur",
        content: message,
    }
}

export const removeFlash = () => {
    return {
        type: actionTypes.FLASH_OUT
    }
}