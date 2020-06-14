import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { fetchToRegister } from '../redux/authentication/authMiddleware';

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory();

  const register = async (e) => {
    const data = {
      user: {
        email: email,
        password: password,
      },
    };
    e.preventDefault();
    if (await dispatch(fetchToRegister(data))) {
      history.push("/");
    }
  };

  return (
    <div>
      <form onSubmit={register}>
        <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  )
}

export default Register;
