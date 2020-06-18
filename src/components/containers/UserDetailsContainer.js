import React from 'react'
import UserDetails from '../UserDetails'

const UserDetailsContainer = (props) => {
  const {loggedInUser, users, handleDelete, handleUpdateUser} = props

  console.log('user detail container props ', props)
  return (
    <div className="user-details-container">
      {users.map(user => (
        <UserDetails
          user={user}
          loggedInUser={loggedInUser}
          handleDelete={(event) => handleDelete(user)}
          handleUpdateUser={handleUpdateUser}
        />)
      )}
    </div>
  )
}
export default UserDetailsContainer
