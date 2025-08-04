import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipeStore();
  const [recipe, setRecipe] = useState({ title: '', ingredients: '', instructions: '' });

  useEffect(() => {
    const recipeToEdit = recipes.find(recipe => recipe.id === id);
    if (recipeToEdit) {
      setRecipe(recipeToEdit);
    }
  }, [id, recipes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateRecipe(recipe);
    navigate(`/recipe/${id}`);
  };

  return (
    <div>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input 
            type="text" 
            name="title" 
            value={recipe.title} 
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>
          Ingredients:
          <textarea 
            name="ingredients" 
            value={recipe.ingredients} 
            onChange={handleChange} 
          />
        </label>
        <br />
        <label>
          Instructions:
          <textarea 
            name="instructions" 
            value={recipe.instructions} 
            onChange={handleChange} 
          />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditRecipeForm;
