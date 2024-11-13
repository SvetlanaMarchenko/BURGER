import {BASE_URL} from '../../utils/api.js'

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const fetchIngredientsRequest = () => ({ type: FETCH_INGREDIENTS_REQUEST });
export const fetchIngredientsSuccess = (ingredients) => ({ type: FETCH_INGREDIENTS_SUCCESS, payload: ingredients });
export const fetchIngredientsFailure = (error) => ({ type: FETCH_INGREDIENTS_FAILURE, payload: error });


export const fetchDataIngredients = () => {
  return (dispatch) => {
    dispatch(fetchIngredientsRequest());

    fetch(`${BASE_URL}/ingredients`)
      .then(response => response.json())
      .then(json => dispatch(fetchIngredientsSuccess(json.data)))
      .catch(error => dispatch(fetchIngredientsFailure(error)));
  };
};


