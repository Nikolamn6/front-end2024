import React from 'react'
import { ChatState } from '../../../../contexts/ChatProvider'

function UserListItem({ handleFunction }) {
    const { user } = ChatState();

  return (
    <div onClick={handleFunction}>
        
        <h5>{user.name}</h5>
        <h6 fontSize="xs">
          <b>Email : </b>
          {user.email}
        </h6>

    </div>
  )
}

export default UserListItem