import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams, Navigate, useLocation } from 'react-router-dom';
import Profile from "./components/Profile";
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider from './components/AuthProvider';
import Login from './components/Login';

const BlogPost = () => {
  const { id } = useParams();
  return <h3>Blog Post ID: {id}</h3>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/blog/2">Blog Post 2</Link>
            </li>
            <li>
              <Link to="/blog/1">Blog Post 1</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Home route */}
          <Route path="/" element={<div>Home Page</div>} />
          {/* login route */}
          <Route path='/login' element={<Login/>} />


          {/* Blog parent route with nested routes */}
          <Route path="/blog/:id" element={<Profile />}>
            {/* Nested blog post route */}
            <Route path=":id" element={<BlogPost />} />

            {/* Default nested route */}
            <Route index element={<div>Select a blog post</div>} />
          </Route>

          {/* Profile route */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;