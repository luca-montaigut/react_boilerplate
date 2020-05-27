import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { logoutSuccess } from '../redux/actions/authActions'



const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch(logoutSuccess())
    history.push("/");
  }

  return (
    <>
      <Link to="/">Home</Link>
      {!isAuthenticated &&
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      }
      {isAuthenticated &&
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Se déconnecter</button>
        </>}
    </>
  );
};

export default Navbar;