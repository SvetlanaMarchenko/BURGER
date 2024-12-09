import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { fetchDataIngredientsAndSetCurrent } from '../../services/actions/ingredients-actions';
import { useDispatch } from 'react-redux';
import style from './ingredients-id-page.module.css';

const IngredientsIdPage = () => {
  const { id } = useParams();  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDataIngredientsAndSetCurrent(id));
  }, [dispatch, id]);

  return (
    <div className={style.appLayout}>
      <div className={style.postModalIngredientDetails}>
        <IngredientDetails />
      </div>
    </div>
  );
};

export default IngredientsIdPage;
