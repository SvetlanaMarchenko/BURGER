export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT';
export const FETCH_INGREDIENT_REQUEST = 'FETCH_INGREDIENT_REQUEST';
export const FETCH_INGREDIENT_SUCCESS = 'FETCH_INGREDIENT_SUCCESS';
export const FETCH_INGREDIENT_FAILURE = 'FETCH_INGREDIENT_FAILURE';

const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients';

export const fetchIngredient = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_INGREDIENT_REQUEST });   
    fetch(INGREDIENTS_API_URL)
      .then(response => response.json())
      .then(json => {
        dispatch({
          type: FETCH_INGREDIENT_SUCCESS,
          payload: (json.data)
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_INGREDIENT_FAILURE,
          error: error
        });
      });
  };
};

export const setCurrentIngredient = (ingredient) => ({
  type: SET_CURRENT_INGREDIENT,
  payload: ingredient
});

export const clearCurrentIngredient = () => ({
  type: CLEAR_CURRENT_INGREDIENT
});
