import React from 'react';
import { useSelector } from 'react-redux'


const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const { id, username } = user

  return (
    <>
      <h1>Welcome on your profile.</h1>
      <p>id : {id}</p>
      <p>name : {username}</p>
    </>
  )
}

export default Profile;
