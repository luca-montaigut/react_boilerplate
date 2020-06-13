import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { logoutSuccess } from "../../redux/authentication/authActions";

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch(logoutSuccess())
    history.push("/");
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {!isAuthenticated &&
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Register</Link>
        </>
      }
      {isAuthenticated &&
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Se déconnecter</button>
        </>}
    </nav>
  );
};

export default Navbar;