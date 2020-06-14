import React from 'react';
import { useSelector } from 'react-redux'


const Profile = () => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const { id, email, first_name, last_name } = currentUser

  return (
    <>
      <h1>Welcome on your profile.</h1>
      <p>id : {id}</p>
      <p>prénom : {first_name}</p>
      <p>nom : {last_name}</p>
      <p>mail : {email}</p>
    </>
  )
}

export default Profile;
