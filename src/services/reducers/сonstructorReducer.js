import { 
  ADD_INGREDIENT, 
  REMOVE_INGREDIENT 
} from '../actions/constructorActions';

const initialState = {
  ingredients: []
};

const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload] 
      };

    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          ingredient => ingredient.id !== action.payload.id 
        )
      };

    default:
      return state; 
  }
};

export default constructorReducer;

