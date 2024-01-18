import React, { useState, useEffect, useCallback } from 'react';

function OrderManager({ recipes }) {
  const [orders, setOrders] = useState([]);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const addOrder = () => {
    if (selectedRecipeIndex === '') {
      alert("Veuillez sélectionner une recette.");
      return;
    }

    fetch('https://worldtimeapi.org/api/timezone/Europe/Paris')
      .then((response) => response.json())
      .then((data) => {
        const newOrder = {
          recipe: recipes[selectedRecipeIndex].name,
          time: new Date(data.datetime).toLocaleTimeString(),
          timestamp: new Date(data.datetime),
          elapsedTime: '00m00s'
        };
        setOrders([...orders, newOrder]);
        setConfirmationMessage(`La recette ${newOrder.recipe} a bien été prise en compte à ${newOrder.time} et envoyée en cuisine.`);
        setSelectedRecipeIndex('');
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de l\'heure :', error);
      });
  };

  const validateOrder = (index) => {
    const newOrders = orders.filter((_, i) => i !== index);
    setOrders(newOrders);
  };

  const updateElapsedTime = useCallback(() => {
    setOrders(orders.map(order => {
      const now = new Date();
      const differenceEnSecondes = Math.floor((now - order.timestamp) / 1000);
      const minutes = Math.floor(differenceEnSecondes / 60).toString().padStart(2, '0');
      const seconds = (differenceEnSecondes % 60).toString().padStart(2, '0');
      return { ...order, elapsedTime: `${minutes}m${seconds}s` };
    }));
  }, [orders]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateElapsedTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [updateElapsedTime]);

  return (
    <>
      <div>
        <h2 className='text-4xl font-extrabold dark:text-white text-center mb-2 mt-10'>Gérer les commandes</h2>
        <div className='flex items-center gap-4'>
          <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={selectedRecipeIndex}
            onChange={(e) => setSelectedRecipeIndex(e.target.value)}
          >
            <option value="">Sélectionner une recette</option>
            {recipes.map((recipe, index) => (
              <option key={index} value={index}>
                {recipe.name}
              </option>
            ))}
          </select>
          <button onClick={addOrder} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 w-full py-2.5 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>Envoyer à la cuisine</button>
        </div>
      </div>
      <div className='mt-4 flex items-center flex-col justify-center text-center'>
        {confirmationMessage && <h4 className='text-xl font-bold dark:text-white my-4'>{confirmationMessage}</h4>}
        <h3 className='text-3xl font-bold dark:text-white'>Liste des commandes :</h3>
        <ul className='max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400'>
          {orders.map((order, index) => (
            <li key={index} className='flex items-center'>
              Recette : {order.recipe}, Temps écoulé : {order.elapsedTime}
              <button onClick={() => validateOrder(index)} className='ml-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2 me-2dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full'>Valider la commande</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default OrderManager;