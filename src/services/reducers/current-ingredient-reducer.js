import {
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
} from '../actions/current-ingredient-actions';

const initialState = null;

const currentIngredientsReducer = (currentIngredientState = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return action.payload;
    case CLEAR_CURRENT_INGREDIENT:
      return null ;
    default:
      return currentIngredientState;
  }
};

export default currentIngredientsReducer;
