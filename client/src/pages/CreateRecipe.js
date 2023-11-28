import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    cookingTime: '',
    imageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const userId = user ? user._id : '';
  const authToken = user?.token || null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.cookingTime || !formData.imageUrl) {
      alert('Please fill out all required fields');
      return;
    }

    const ingredients = formData.ingredients
      ? formData.ingredients.split(',').map((ingredient) => ingredient.trim())
      : [];
    // const instructions = formData.instructions
    //   ? formData.instructions.split(',').map((instruction) => instruction.trim())
    //   : [];

    const instructions = formData.instructions ? formData.instructions.trim() : '';
  

    try {
      const response = await axios.post(
        'https://server-mern-delight.vercel.app/api/v1/create',
        {
          name: formData.name,
          ingredients: ingredients,
          instructions: instructions,
          cookingTime: formData.cookingTime,
          imageUrl: formData.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        console.log('Recipe created successfully');
        navigate('/'); // Assuming you have a route named '/recipe-listing' for displaying the recipe list
      } else {
        console.log('Recipe creation failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);

      if (error.response) {
        console.error('Server returned an error with status:', error.response.status);
        console.error('Error data:', error.response.data);
      }
    }
  };

  return (
    <div className="create-recipe-page">
      <div className="max-w-[800px] mx-auto p-4">
        <h1 className="text-3xl font-bold text-orange-700 mb-4">Create Recipe</h1>

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
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
