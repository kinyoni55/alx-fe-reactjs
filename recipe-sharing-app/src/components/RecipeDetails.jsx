// RecipeDetails component
  import { useRecipeStore } from './recipeStore';
    import { useParams } from 'react-router-dom';
    import useRecipeStore from './recipeStore';
    import EditRecipeForm from './EditRecipeForm';
    import DeleteRecipeButton from './DeleteRecipeButton';

    const RecipeDetails = () => {
    const { id } = useParams(); // Get ID from URL
    const recipe = useRecipeStore((state) =>
      state.recipes.find((r) => r.id === id)
    );

    if (!recipe) return <p>Recipe not found</p>;

    return (
      <div>
        <h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        {/* Render EditRecipeForm and DeleteRecipeButton here */}
        <EditRecipeForm recipe={recipe} />
        <DeleteRecipeButton id={recipe.id} />
      </div>
    );
  };

  export default RecipeDetails;