// services/actions/orderActions.js
export const CREATE_INGREDIENTS_REQUEST = 'CREATE_INGREDIENTS_REQUEST';
export const CREATE_INGREDIENTS_SUCCESS = 'CREATE_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const createIngredientsRequest = () => ({ type: CREATE_INGREDIENTS_REQUEST });
export const createIngredientsSuccess = (ingredients) => ({ type: CREATE_INGREDIENTS_SUCCESS, payload: ingredients });
export const fetchIngredientsFailure = (error) => ({ type: FETCH_INGREDIENTS_FAILURE, payload: error });

const ORDER_API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const createOrder = () => async (dispatch) => {
  dispatch(createIngredientsRequest());

  try {
    const response = await fetch(ORDER_API_URL);
    if (!response.ok) {
      throw new Error(`API Ошибка: ${response.status}`);
    }

    const data = await response.json();
    dispatch(createIngredientsSuccess(data.order.number));
  } 
  
  catch (error) {
    dispatch(fetchIngredientsFailure(error.message));
  }
};


