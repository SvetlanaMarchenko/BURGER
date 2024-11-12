import {
  SET_CURRENT_INGREDIENT,
  CLEAR_CURRENT_INGREDIENT,
  FETCH_INGREDIENT_REQUEST,
  FETCH_INGREDIENT_SUCCESS,
  FETCH_INGREDIENT_FAILURE
} from '../actions/current-ingredient-actions';

const initialState = {
  currentIngredient: null,
  loading: false,
  error: null
};

const currentIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: action.payload };
    case CLEAR_CURRENT_INGREDIENT:
      return { ...state, currentIngredient: null };
    case FETCH_INGREDIENT_REQUEST:
      return { ...state, loading: true };
    case FETCH_INGREDIENT_SUCCESS:
      return { ...state, loading: false, currentIngredient: action.payload };
    case FETCH_INGREDIENT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default currentIngredientsReducer;
