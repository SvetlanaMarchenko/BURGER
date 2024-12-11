import {requestFromApi} from '../../utils/api.js'
import {setCurrentIngredient} from './current-ingredient-actions.js'
import { Ingredients } from '../../utils/types/ingredients';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState, AppDispatch } from '../store.js';

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

export const fetchDataIngredients = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return (dispatch) => {
    dispatch(fetchIngredientsRequest());

    requestFromApi('/ingredients')
      .then(json => dispatch(fetchIngredientsSuccess(json.data)))
      .catch(error => dispatch(fetchIngredientsFailure(error.toString())));
  };
};

export const fetchDataIngredientsAndSetCurrent = (ingredient_id: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(fetchIngredientsRequest());

    requestFromApi('/ingredients')
      .then(json => {
        const fetchedIngredients = json.data
        const desiredIngredient = fetchedIngredients.find((ingr: { _id: string; }) => ingr._id === ingredient_id )

        if(desiredIngredient) {
          return dispatch(setCurrentIngredient(desiredIngredient))
        } else {
          console.error("No ingredient with id ", ingredient_id)
        }
          return dispatch(fetchIngredientsSuccess(fetchedIngredients))
      })
      .catch(error => dispatch(fetchIngredientsFailure(error)));
  };
};



