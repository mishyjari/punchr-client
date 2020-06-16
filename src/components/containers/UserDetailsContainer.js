import React from 'react'
import UserDetails from '../UserDetails'

const UserDetailsContainer = (props) => {
  const {loggedInUserId, managerIsLoggedIn, users, handleDelete, handleSubmit} = props

  return (
    <div className="user-details-container">
      <h2>Users</h2>
      {users.map(user => (
        <UserDetails 
          user={user} 
          loggedInUserId={loggedInUserId} 
          managerIsLoggedIn={managerIsLoggedIn}
          handleDelete={(event) => handleDelete(user)}
          handleSubmit={handleSubmit}
        />)
      )}
    </div>
  )
}
export default UserDetailsContainer