import React, { useState } from 'react';

function RecipeManager({ onAddRecipe, onDeleteRecipe, recipes }) {
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeIngredients, setNewRecipeIngredients] = useState('');

  const addRecipe = () => {
    if (newRecipeName && newRecipeIngredients) {
      onAddRecipe({ name: newRecipeName, ingredients: newRecipeIngredients });
      setNewRecipeName('');
      setNewRecipeIngredients('');
    }
  };

  return (
    <div>
      <h2 className='text-4xl font-extrabold dark:text-white text-center mb-2'>Ajouter une recette à la carte</h2>
      <div className='flex gap-4 mb-6'>
        <input
          type="text"
          placeholder="Nom de la recette"
          value={newRecipeName}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          onChange={(e) => setNewRecipeName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ingrédients"
          value={newRecipeIngredients}
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          onChange={(e) => setNewRecipeIngredients(e.target.value)}
        />
      </div>
      <div className='text-center'>
        <button onClick={addRecipe} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>Ajouter Recette</button>
      </div>
      <h2 className='text-3xl font-bold dark:text-white text-center mb-2 mt-10'>Liste des recettes :</h2>
      <ul className='max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'>
        {recipes.map((recipe, index) => (
          <li key={index}>
            {recipe.name} - {recipe.ingredients}
            <button onClick={() => onDeleteRecipe(index)} className='ml-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipeManager;