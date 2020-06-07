import React from 'react';
import { useSelector } from 'react-redux'


const Profile = () => {
  const user = useSelector(state => state.auth.user);
  const { id, email } = user

  return (
    <>
      <h1>Welcome on your profile.</h1>
      <p>id : {id}</p>
      <p>mail : {email}</p>
    </>
  )
}

export default Profile;
