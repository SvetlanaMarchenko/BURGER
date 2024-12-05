import {requestFromApi} from '../../utils/api.js'
import {setCurrentIngredient} from '../../services/actions/current-ingredient-actions.js'

export const FETCH_INGREDIENTS_REQUEST = 'FETCH_INGREDIENTS_REQUEST';
export const FETCH_INGREDIENTS_SUCCESS = 'FETCH_INGREDIENTS_SUCCESS';
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE';

export const fetchIngredientsRequest = () => ({ type: FETCH_INGREDIENTS_REQUEST });
export const fetchIngredientsSuccess = (ingredients) => ({ type: FETCH_INGREDIENTS_SUCCESS, payload: ingredients });
export const fetchIngredientsFailure = (error) => ({ type: FETCH_INGREDIENTS_FAILURE, payload: error });


export const fetchDataIngredients = () => {
  return (dispatch) => {
    dispatch(fetchIngredientsRequest());

    requestFromApi('/ingredients')
      .then(json => dispatch(fetchIngredientsSuccess(json.data)))
      .catch(error => dispatch(fetchIngredientsFailure(error)));
  };
};

export const fetchDataIngredientsAndSetCurrent = (ingredient_id) => {
  return (dispatch) => {
    dispatch(fetchIngredientsRequest());

    requestFromApi('/ingredients')
      .then(json => {
        const fetchedIngredients = json.data
        const desiredIngredient = fetchedIngredients.find(ingr => ingr._id === ingredient_id )

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


