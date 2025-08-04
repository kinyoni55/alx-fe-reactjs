import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './components/Home';
import PostsComponent from './components/PostsComponent';

// Create a client
const queryClient = new QueryClient();

function app(){


  return(
    <QueryClientProvider client={queryClient}>
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsComponent />} />
      </Routes>
    </Router>
  </QueryClientProvider>
  );
}
export default app;

