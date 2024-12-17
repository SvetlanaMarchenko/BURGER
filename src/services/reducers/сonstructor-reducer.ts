
import { 
    ADD_INGREDIENT, 
    REMOVE_INGREDIENT, 
    SET_BUN,
    REMOVE_BUN,
    CLEAR_CONSTRUCTOR, 
    REPLACE_INGREDIENT 
  } from '../actions/constructor-actions';
  
  import { Ingredient } from '../../utils/types/ingredients'; 
  
  interface ConstructorState {
    bun: Ingredient | null; 
    ingredients: Ingredient[];
  }
  
  const initialState: ConstructorState = {
    bun: null,
    ingredients: []
  };
  
  interface AddIngredientAction {
    type: typeof ADD_INGREDIENT;
    payload: Ingredient;
  }
  
  interface RemoveIngredientAction {
    type: typeof REMOVE_INGREDIENT;
    payload: number;
  }
  
  interface SetBunAction {
    type: typeof SET_BUN;
    payload: Ingredient;
  }
  
  interface RemoveBunAction {
    type: typeof REMOVE_BUN;
  }
  
  interface ClearConstructorAction {
    type: typeof CLEAR_CONSTRUCTOR;
  }
  
  interface ReplaceIngredientAction {
    type: typeof REPLACE_INGREDIENT;
    fromIndex: number;
    toIndex: number;
  }
  
  type ConstructorActions =
    | AddIngredientAction
    | RemoveIngredientAction
    | SetBunAction
    | RemoveBunAction
    | ClearConstructorAction
    | ReplaceIngredientAction;
  
  const constructorReducer = (
    state = initialState,
    action: ConstructorActions
  ): ConstructorState => {
    switch (action.type) {
      case ADD_INGREDIENT:
        return {
          ...state,
          ingredients: [...state.ingredients, action.payload]
        };
  
      case REMOVE_INGREDIENT:
        return {
          ...state,
          ingredients: state.ingredients.filter((_, index) => index !== action.payload)
        };
  
      case SET_BUN:
        return {
          ...state,
          bun: action.payload
        };
  
      case REMOVE_BUN:
        return {
          ...state,
          bun: null
        };
  
      case CLEAR_CONSTRUCTOR:
        return initialState;
  
      case REPLACE_INGREDIENT:
        const { fromIndex, toIndex } = action;
        const newIngredients = [...state.ingredients];
        const [movedIngredient] = newIngredients.splice(fromIndex, 1);
        const isMovingForward = fromIndex < toIndex;
        const isMovingMoreThanOneSpot = toIndex - fromIndex > 1;
        const needToAdjustIndex = isMovingForward && isMovingMoreThanOneSpot;
        const adjustedToIndex = needToAdjustIndex ? toIndex - 1 : toIndex;
        
        newIngredients.splice(adjustedToIndex, 0, movedIngredient);
  
        return {
          ...state,
          ingredients: newIngredients
        };
  
      default:
        return state;
    }
  };
  
  export default constructorReducer;
  