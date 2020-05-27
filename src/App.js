import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Cookies from 'js-cookie'

import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Profile from './pages/Profile';

import { loadUser } from './redux/actions/authActions'

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const dispatch = useDispatch()

  useEffect(() => {
    if (Cookies.get('token')) {
      fetch("https://api-minireseausocial.mathis-dyk.fr/users/me", {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response
        })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          dispatch(loadUser(response))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/" component={Home} />
        <AuthRoute path="/profile" component={Profile} />
      </Switch>
    </Router>

  )
}

export default App;
