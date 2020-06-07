import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { loginSuccess, loginFail } from '../redux/actions/authActions'


const Login = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory();

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const login = async () => {
    const API_URL = process.env.REACT_APP_API_URL
    const data = {
      user: {
        email: email,
        password: password
      }
    }

    const response = await fetch(`${API_URL}/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    try {
      const token = await response.headers.get('authorization').split(' ')[1]
      const user = await response.json()
      const userToLog = { token, user }
      dispatch(loginSuccess(userToLog))
      history.push("/");
    } catch (error) {
      console.log(error)
      alert("Aucun utilisateur correspondant")
      dispatch(loginFail())
    }
  }

  return (
    <div>
      {!isAuthenticated &&
        <>
          <input type="text" placeholder="email" value={email} onChange={handleEmailChange} required />
          <input type="password" placeholder="password" value={password} onChange={handlePasswordChange} required />
          <button onClick={login}>Submit</button>
        </>
      }
      {isAuthenticated &&
        <>
          <h1>connexion réussi !</h1>
        </>
      }
    </div>
  )
}

export default Login;
