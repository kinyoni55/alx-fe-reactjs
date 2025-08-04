import ProfilePage from './components/ProfilePage';
import React, {useContext} from 'react';
import UserContext from './components/UserContext';

import ReactDOM from 'react-dom'

function App() {

  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };
  

  return (
    <UserContext.Provider value={userData}>
        <ProfilePage userData={userData} />
    </UserContext.Provider>
   );
};


export default App;