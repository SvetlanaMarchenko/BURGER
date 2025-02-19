
import { Ingredients } from '../../utils/types/ingredients';
import { Action } from 'redux';


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





