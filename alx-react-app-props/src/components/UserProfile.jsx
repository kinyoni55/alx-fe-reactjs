import React, {UseContext} from 'react';
import UserContext from "./UserContext";

function USerProfile(UserContext) {
    return (
        UserContext.name && UserContext.age && UserContext.bio ? (
            <UserProfile name={UserContext.name} age={UserContext.age} bio={UserContext.bio} />
        ) : (
            <p>Please provide valid user information.</p>
        )
    )
}

 const UserProfile = (UserContext) => {
   return (
     <div>
       <h2>{UserContext.name}</h2>
       <p>Age: {UserContext.age}</p>
       <p>Bio: {UserContext.bio}</p>
     </div>
   );
 };

export default USerProfile;