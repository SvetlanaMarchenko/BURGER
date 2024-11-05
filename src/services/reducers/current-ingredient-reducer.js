import {
  SET_CURRENT_INGREDIENT,
  REMOVE_CURRENT_INGREDIENT,
} from '../actions/current-ingredient-actions';

const initialState = {
  currentIngredient: null
}

const currentIngredientsReducer = (state = initialState, action) =>  {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT: 
      return {...state, currentIngredient: action.payload}
    case REMOVE_CURRENT_INGREDIENT: 
      return {...state, currentIngredient: null }

    default:
        return state;
  }
}
export default currentIngredientsReducer


