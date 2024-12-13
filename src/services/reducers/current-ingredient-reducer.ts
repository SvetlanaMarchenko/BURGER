import {
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
} from '../actions/current-ingredient-actions';
import { Ingredient } from '../../utils/types/ingredients'; 

type CurrentIngredientState = Ingredient | null;

const initialState: CurrentIngredientState = null;

const currentIngredientsReducer = (
  currentIngredientState = initialState,
  action: { type: string; payload?: Ingredient }
): CurrentIngredientState => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return action.payload || null; 
    case CLEAR_CURRENT_INGREDIENT:
      return null;
    default:
      return currentIngredientState;
  }
};

export default currentIngredientsReducer;
