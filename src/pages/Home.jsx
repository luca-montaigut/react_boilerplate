import React from 'react';
import { useSelector } from 'react-redux'


const Home = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  return (
    <>
      <h1>Welcome on My Social Network.</h1>
      <p>This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
      {isAuthenticated &&
        <>
          <h2>fuck {user.username}</h2>
        </>}
    </>
  )
}

export default Home;
