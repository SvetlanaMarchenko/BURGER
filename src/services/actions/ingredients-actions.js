import axios from 'axios';

// services/actions/orderActions.js
export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const fetchIngredientsRequest = () => ({ type: FETCH_INGREDIENTS_REQUEST });
export const fetchIngredientsSuccess = (ingredients) => ({ type: FETCH_INGREDIENTS_SUCCESS, payload: ingredients });
export const fetchIngredientsFailure = (error) => ({ type: FETCH_INGREDIENTS_FAILURE, payload: error });


const ORDER_API_URL = 'https://norma.nomoreparties.space/api/ingredients';





export const fetchDataIngredients = () => async (dispatch) => {
  dispatch(fetchIngredientsRequest());

  try {
    const response = await axios(ORDER_API_URL);
    if (!response.ok) {
      throw new Error(`Это API Ошибка: ${response.status}`);
    }

    const data = await response.json();
    dispatch(fetchIngredientsSuccess(data.ingredients));
  } 
  
  catch (error) {
    dispatch(fetchIngredientsFailure(error.message));
  }
};



