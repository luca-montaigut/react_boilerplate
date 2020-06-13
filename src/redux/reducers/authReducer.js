import {
  LOAD_USER,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "../actionTypes";

import Cookies from "js-cookie";

const initialState = {
  token: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      Cookies.set("token", action.token);
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
      Cookies.remove("token");
      return {
        ...state,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
