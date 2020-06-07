import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { registerFail } from '../redux/actions/authActions'

import Cookies from 'js-cookie'


const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const history = useHistory();

  const register = async () => {
    const API_URL = process.env.REACT_APP_API_URL
    const data = {
      user: {
        email: email,
        password: password
      }
    }

    const response = await fetch(`${API_URL}/signup`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    try {
      const token = await response.headers.get('authorization').split(' ')[1]
      Cookies.set('token', token)
    } catch (error) {
      console.log(error)
      alert("Erreur d'enregistrement")
      dispatch(registerFail())
      return false
    }

    history.push("/");
    document.location.reload(true);
  }

  return (
    <div>
      <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button onClick={register}>Submit</button>
    </div>
  )
}

export default Register;
