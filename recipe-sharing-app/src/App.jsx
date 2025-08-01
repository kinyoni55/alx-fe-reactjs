import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import { useRecipeStore } from './components/recipeStore';

function App() {
  
  return (

    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/add" element={<AddRecipeForm />} />
        {/* Assuming EditRecipeForm and RecipeDetails are defined and imported */}
        <Route path="/edit/:recipeId" element={<EditRecipeForm />} />
        <Route path="/details/:recipeId" element={<RecipeDetails />} />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="recommendations" element={<Recommendations />} />

      </Routes>
    </Router>
  );
}

export default App
