
import { Ingredients } from '../../utils/types/ingredients';
import { Action } from 'redux';
import { AppDispatch } from '../store.js';
import {requestFromApi} from '../../utils/api.js'
import {setCurrentIngredient} from './current-ingredient-actions.js'

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const fetchIngredientsRequest = (): Action => ({
  type: FETCH_INGREDIENTS_REQUEST
});

export const fetchIngredientsSuccess = (ingredients: Ingredients): { type: typeof FETCH_INGREDIENTS_SUCCESS, payload: Ingredients } => ({
  type: FETCH_INGREDIENTS_SUCCESS,
  payload: ingredients
});

export const fetchIngredientsFailure = (error: string): { type: typeof FETCH_INGREDIENTS_FAILURE, payload: string } => ({
  type: FETCH_INGREDIENTS_FAILURE,
  payload: error
});

export const fetchDataIngredients = () => {
  return (dispatch: AppDispatch) => {
    dispatch(fetchIngredientsRequest());

    requestFromApi('/ingredients')
      .then(json => dispatch(fetchIngredientsSuccess(json.data)))
      .catch(error => dispatch(fetchIngredientsFailure(error.toString())));
  };
};


export const fetchDataIngredientsAndSetCurrent = (ingredient_id: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchIngredientsRequest());

    try {
      const json = await requestFromApi('/ingredients');
      const fetchedIngredients = json.data;
      const desiredIngredient = fetchedIngredients.find((ingr: { _id: string }) => ingr._id === ingredient_id);

      if (desiredIngredient) {  
        dispatch(setCurrentIngredient(desiredIngredient)); 
      } else {
        console.error("No ingredient with id ", ingredient_id);
      }
      dispatch(fetchIngredientsSuccess(fetchedIngredients));
    } catch (error) {
      dispatch(fetchIngredientsFailure("Что-то точно не так"));
    }
  };
};



