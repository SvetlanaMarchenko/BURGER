import { 
  ADD_INGREDIENT, 
  REMOVE_INGREDIENT,
  CLEAR_CONSTRUCTOR
} from '../actions/constructor-actions';

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

    case CLEAR_CONSTRUCTOR:
      return initialState;
    default:
      return state; 
  }
};

export default constructorReducer;

