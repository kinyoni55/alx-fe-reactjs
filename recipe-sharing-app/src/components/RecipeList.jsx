// RecipeList component
  import { useRecipeStore } from './recipeStore';
  import { Link } from 'react-router-dom';
  
  const RecipeList = () => {
    const recipes = useRecipeStore(state => state.recipes);

    return (
    <div>
      <h2>All Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
    );
  }

export default RecipeList; 