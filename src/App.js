import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Cookies from 'js-cookie'

import FlashMessage from "./components/Layout/FlashMessage";
import Navbar from './components/Layout/Navbar';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from './pages/Register';
import Profile from './pages/Profile';
import Footer from "./components/Layout/Footer";

import { fetchToLoadUser } from './redux/authentication/authMiddleware'

const App = () => {
  const [loadReady, setLoadReady] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const displayFlash = useSelector((state) => state.flash.display);

  const dispatch = useDispatch();

  useEffect(() => {
    const landing = async () => {
      const token = Cookies.get("token");
      if (!currentUser && token) {
        await dispatch(fetchToLoadUser(token));
      }
      setLoadReady(true);
    };
    landing();
  }, [dispatch, currentUser]);

  const NotAuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      currentUser ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
          <Component {...props} />
        )
    )} />
  )

  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      currentUser ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      {displayFlash && <FlashMessage />}
      {loadReady && <Switch>
        <Route exact path="/" component={Home} />
        <NotAuthRoute path="/login" component={Login} />
        <NotAuthRoute path="/signup" component={Register} />
        <AuthRoute path="/profile" component={Profile} />
        <Route path="*" component={() => <div>ERREUR 404</div>} />
      </Switch>}
      <Footer />
    </Router>

  )
}

export default App;
