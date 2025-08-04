// src/components/RecipeDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
{
  /* "ingredients", "instructions" */
}

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("/src/data.json");
        const recipes = await response.json();
        const foundRecipe = recipes.find((r) => r.id === parseInt(id));

        if (!foundRecipe) {
          throw new Error("Recipe not found");
        }

        setRecipe(foundRecipe);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>
            <p className="text-gray-600 text-lg">{recipe.summary}</p>
          </div>
        </div>

        {/* Additional Content Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500 italic">Recipe details coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
