import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UpdateRecipe = ({ recipe }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: recipe.name,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    cookingTime: recipe.cookingTime,
    imageUrl: recipe.imageUrl,
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const userId = user ? user._id : null;
  const authToken = user ? user.token : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://server-mern-delight.vercel.app/api/v1/update/${recipe._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      setSuccessMessage('Recipe updated successfully');
      setErrorMessage(null);
      console.log('Recipe updated:', response.data);
      // Navigate to the '/all' route after successful update
      navigate('/all');
    } catch (error) {
      setSuccessMessage(null);
      setErrorMessage('Error updating recipe. Please try again.');
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div className="update-recipe-page">
      <div className="max-w-[800px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">Update Recipe</h1>

        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Recipe Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 border border-gray-300 rounded-lg px-4 focus:outline-none focus:border-orange-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Ingredients (comma-separated)</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-700"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-700"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Cooking Time (minutes)</label>
            <input
              type="number"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              className="w-full h-10 border border-gray-300 rounded-lg px-4 focus:outline-none focus:border-orange-700"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-semibold mb-2">Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full h-10 border border-gray-300 rounded-lg px-4 focus:outline-none focus:border-orange-700"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-700 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
            >
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRecipe;
