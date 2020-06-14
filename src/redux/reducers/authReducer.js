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
  isAuthenticated: null,
  user: null,
  canAccess: null,
  isTeacher: null,
  isAdmin: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        canAccess: action.user.can_access,
        isTeacher: action.user.is_teacher,
        isAdmin: action.user.is_admin,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      Cookies.set("token", action.token);
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        user: action.user,
        canAccess: action.user.can_access,
        isTeacher: action.user.is_teacher,
        isAdmin: action.user.is_admin,
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
      Cookies.remove("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        canAccess: false,
        isTeacher: false,
        isAdmin: false,
      };
    default:
      return state;
  }
};

export default authReducer;
