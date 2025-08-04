// Login component

import { BrowserRouter as Router, Route, Routes, Link, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function Login() {
    const { toggleAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
  
    const from = location.state?.from?.pathname || '/';
  
    const handleLogin = () => {
      toggleAuth();
      navigate(from, { replace: true });
    };
  
    return (
      <div>
        <h2>Login Page</h2>
        <button onClick={handleLogin}>Log in</button>
      </div>
    );
  }
  export default Login;