import React, { useState, useEffect } from 'react';
import AddRecipeForm from './components/AddRecipeForm'
import RecipeList from './components/RecipeList'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import DeleteRecipeButton from './components/DeleteRecipeButton';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationList from './components/RecommendationsList';
import './app.css'

function App() {
  const [count, setCount] = useState(0);
  

  return (
    
   
    <BrowserRouter>       
      <SearchBar />
      <Routes>
      
       
      
        <Route path="/" element={<RecipeList />} /> 
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/edit/:id" element={<EditRecipeForm />} />
      </Routes>
       
      <FavoritesList/>
      <RecommendationList/>
    </BrowserRouter>
    
    
   
  );
};

export default App


