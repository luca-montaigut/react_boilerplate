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
    const autoLoginUser = async () => {
      const API_URL = process.env.REACT_APP_API_URL
      const response = await fetch(`${API_URL}/api/v1/profile`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      })
      try {

        const userToLoad = await response.json()
        dispatch(loadUser(userToLoad))

      } catch (error) {
        console.log(error)
      }
    }
    if (Cookies.get('token')) {
      autoLoginUser()
    }
  }, [dispatch])

  const UnAuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
          <Component {...props} />
        )
    )} />
  )

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
        <Route exact path="/" component={Home} />
        <UnAuthRoute path="/login" component={Login} />
        <UnAuthRoute path="/signup" component={Register} />
        <AuthRoute path="/profile" component={Profile} />
        <Route path="/" component={() => <div>ERREUR 404</div>} />
      </Switch>
    </Router>

  )
}

export default App;
