import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create the AuthContext
const AuthContext = createContext({
  isAuthenticated: false,
  toggleAuth: () => {},
});

// AuthProvider component
function AuthProvider({ children  }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// Create a custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

