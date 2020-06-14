import * as authActions from "./authActions";
import { displaySuccess, displayError } from "../flashmessages/flashMiddleware";

import Cookies from "js-cookie";

export const fetchToRegister = (data) => {
  return async (dispatch) => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }

      const token = await response.headers.get("authorization").split(" ")[1];
      const user = await response.json();
      const userToRegister = { token, user };
      dispatch(authActions.registerSuccess(userToRegister));
      dispatch(displaySuccess("Inscription réussie"));
      Cookies.set("token", token);
    } catch (error) {
      console.log(error);
      dispatch(displayError("Erreur d'enregistrement"));
      dispatch(authActions.registerFail());
      Cookies.remove("token");
      return false;
    }
  };
};

export const fetchToLogin = (data) => {
  return async (dispatch) => {
    const API_URL = process.env.REACT_APP_API_URL;

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const token = await response.headers.get("authorization").split(" ")[1];
      const user = await response.json();
      const userToLog = { token, user };
      dispatch(displaySuccess("Connexion réussie"));
      dispatch(authActions.loginSuccess(userToLog));
      Cookies.set("token", token);
    } catch (error) {
      console.log(error);
      dispatch(displayError("Aucun utilisateur correspondant"));
      dispatch(authActions.loginFail());
      Cookies.remove("token");
      return false;
    }
  };
};

export const fetchToLoadUser = (token) => {
  return async (dispatch) => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${API_URL}/api/v1/profile`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const user = await response.json();
      const userToLoad = { token, user };
      dispatch(authActions.loadUser(userToLoad));
    } catch (error) {
      console.log(error);
      dispatch(authActions.loginFail());
      Cookies.remove("token");
    }
  };
};

export const fetchToLogout = (token) => {
  return async (dispatch) => {
    const API_URL = process.env.REACT_APP_API_URL;
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(authActions.logoutSuccess());
      dispatch(displaySuccess("Déconnexion réussie"));
      Cookies.remove("token");
    } catch (error) {
      console.log(error);
      dispatch(displayError("Un problème est survenu, merci de réessayer ultérieurement"));
      dispatch(authActions.logoutFail());
      return false
    }
  };
};