import React, { useState } from 'react';
import RecipeManager from './components/RecipeManager';
import OrderManager from './components/OrderManager';

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleAddRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
  };

  const handleDeleteRecipe = (index) => {
    const newRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(newRecipes);
  };

  return (
    <div className="App flex justify-center items-center flex-col">
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white'>L'artisan Kebabier</h1>
      <RecipeManager onAddRecipe={handleAddRecipe} onDeleteRecipe={handleDeleteRecipe} recipes={recipes} />
      <OrderManager recipes={recipes} />
    </div>
  );
}

export default App;