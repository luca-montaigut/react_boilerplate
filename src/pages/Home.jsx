import React from 'react';
import { useSelector } from 'react-redux'


const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  return (
    <>
      <h1>Welcome on your new website.</h1>
      <p>This website is ready to become a really cool app !</p>
      {isAuthenticated &&
        <>
          <h2>hello {user.email}</h2>
        </>}
    </>
  )
}

export default Home;
