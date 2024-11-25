



import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';

const IngredientsIdPage = () => {
  const { id } = useParams();  

  return (
    <div>
      {/* <IngredientDetails/> */}
      <h2>Детали ингредиента</h2>
      <p>Ингредиент с ID: {id}</p>


    </div>
  );
};

export default IngredientsIdPage;  
