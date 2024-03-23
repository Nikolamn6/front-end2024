import React from 'react'

function UserBadge({ user, handleFunction, admin }) {
  return (
    <div onClick={handleFunction}>
        {user.name}
        {admin === user._id && <span> (Admin)</span>}
    </div>
  )
}

export default UserBadge