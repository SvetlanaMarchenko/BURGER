import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import { fetchDataIngredientsAndSetCurrent } from '../../services/actions/ingredients-actions';
import { useDispatch } from 'react-redux';
import style from './ingredients-id-page.module.css';
import AppHeader from '../../components/app-header/app-header/';

const IngredientsIdPage = () => {
  const { id } = useParams();  
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Trying to load and set ingredient");
    dispatch(fetchDataIngredientsAndSetCurrent(id));
  }, [dispatch, id]);

  return (
    <div className={style.appLayout}>
      <AppHeader />
      <div className={style.postModalIngredientDetails}>
        <IngredientDetails />
      </div>
    </div>
  );
};

export default IngredientsIdPage;
