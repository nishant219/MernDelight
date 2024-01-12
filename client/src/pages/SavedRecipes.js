import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SavedRecipes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    // Redirect to login page if user is not authenticated
    if (!user) {
      navigate('/login'); // Redirect to your login page
      return;
    }

    // Fetch the user's saved recipes from the server
    axios.get(`https://server-mern-delight.vercel.app/api/v1/${user._id}`)
      .then((response) => {
        setSavedRecipes(response.data.savedRecipes);
      })
      .catch((error) => {
        console.error('Error fetching saved recipes:', error);
      });
  }, [user, navigate]);

  return (
    <div className="saved-recipes-page">
      <div className="max-w-[1520px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">Saved Recipes</h1>

        {savedRecipes.length === 0 ? (
          <p>No saved recipes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedRecipes.map((recipe) => (
              <div key={recipe._id} className="bg-white rounded-lg shadow-lg">
                {/* ... (rest of the component remains unchanged) */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedRecipes;
