import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { fetchToLogout } from "../../redux/authentication/authMiddleware";


const Navbar = () => {
  const token = useSelector(state => state.auth.token)
  const currentUser = useSelector(state => state.auth.currentUser)

  const dispatch = useDispatch()
  const history = useHistory()

  const logout = () => {
    dispatch(fetchToLogout(token))
    history.push("/");
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {!currentUser &&
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Register</Link>
        </>
      }
      {currentUser &&
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Se déconnecter</button>
        </>}
    </nav>
  );
};

export default Navbar;