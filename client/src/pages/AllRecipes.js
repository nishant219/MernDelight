// RecipeListing.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UpdateRecipe from './UpdateRecipe';

const RecipeListing = () => {
  const { user } = useAuth();
  const authToken = user?.token || null;
  const [update, setUpdate] = useState(false);
  const [updateRecipe, setUpdateRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/v1/all', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.data;
      console.log('data:', data);

      // Assuming savedRecipes is an array inside the user object
      const savedRecipes = user?.savedRecipes || [];

      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleUpdate = (recipe) => {
    setUpdateRecipe(recipe);
    setUpdate(true);
  };

  const handleSave = async (recipeId) => {
    try {
      const response = await axios.post(
        `http://localhost:7000/api/v1/save/${recipeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Assuming savedRecipes is an array inside the user object
        const updatedSavedRecipes = [...user.savedRecipes, recipeId];
        // Update the user context with the updated savedRecipes array
        // This depends on your context implementation
        // For example, if you have a function like updateUser in your context
        // updateUser({ ...user, savedRecipes: updatedSavedRecipes });
        console.log('Recipe saved successfully');
      } else {
        console.error('Error saving recipe:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const handleDelete = async (recipeId) => {
    try {
      const response = await axios.delete(`http://localhost:7000/api/v1/delete/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        fetchRecipes();
      } else {
        console.error("Error deleting recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <>
      {update ? (
        <UpdateRecipe
          recipe={updateRecipe}
          onCancelUpdate={() => {
            setUpdate(false);
            setUpdateRecipe(null);
          }}
        />
      ) : (
        <div className="recipe-listing-page bg-gray-100 min-h-screen">
          <div className="max-w-[800px] mx-auto p-4">
            <h1 className="text-3xl font-bold text-orange-700 mb-4">All Recipes</h1>

            {user ? null : (
              <>
                <p className="text-red-500 mb-4">Please login to view recipes</p>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <Link to="/login">Login</Link>
                </button>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((recipe) => (
                <div key={recipe._id} className="recipe-card bg-white p-4 rounded-md shadow-md">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{recipe.name}</h2>
                    <p className="text-gray-600 mb-2">
                     Ingredients: {recipe.ingredients} 
                    </p>
                    <p className="text-gray-600 mb-2">
                     Instructions : {recipe.instructions} 
                    </p>
                    <p className="text-gray-600 mb-2">
                      Cooking Time: {recipe.cookingTime} minutes
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdate({ ...recipe})}
                        className="text-green-500 hover:underline"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(recipe._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                    {/* <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(recipe._id)}
                        className="text-gray-900 hover:underline background-color: #ffc04d"
                      >
                        Save
                      </button>
                    </div> */}
                    {/* <Link
                      to={`/recipe/${recipe._id}`}
                      className="text-gray-900 hover:underline mt-2"
                    >
                      View Recipe
                    </Link> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeListing;
