import React, {useContext} from 'react';
import UserContext from './UserContext';

function UserDetails() {
    const userData = UserContext(useContext);
    return (
      <div>
        
        <p>Name: {userData.name}</p>
        <p>Email: {userData.email}</p>
      </div>
    );
  }
  
  export default UserDetails;