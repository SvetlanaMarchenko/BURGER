import { AppDispatch } from '../store.js';
import {requestFromApi} from '../../utils/api.js'
import {setCurrentIngredient} from './current-ingredient-actions.js'
import { fetchIngredientsFailure, fetchIngredientsRequest, fetchIngredientsSuccess } from './ingredients-actions.js';

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