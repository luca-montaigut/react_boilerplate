import React from 'react';
import { useSelector } from 'react-redux'


const Home = () => {
  const currentUser = useSelector(state => state.auth.currentUser);

  return (
    <>
      <h1>Welcome on your new website.</h1>
      <p>This website is ready to become a really cool app !</p>
      {currentUser &&
        <>
          <h2>hello {currentUser.email}</h2>
        </>}
    </>
  )
}

export default Home;
