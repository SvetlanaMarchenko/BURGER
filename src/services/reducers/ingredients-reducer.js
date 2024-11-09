
import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILURE,
} from '../actions/ingredients-actions';


const initialState = {
  allIngredients: [],
  // currentIngredient: null,
  error: null,
  isLoading: true
}

const ingredientsReducer = (state = initialState, action) =>  {
switch (action.type) {
    case FETCH_INGREDIENTS_REQUEST: 
      return {...state, isLoading: true, error: null}
    case FETCH_INGREDIENTS_SUCCESS: 
    return {...state, isLoading: false, allIngredients: action.payload}
    case FETCH_INGREDIENTS_FAILURE: 
      return {...state, isLoading: false, error: action.payload}
    default:
        return state;
  }
}
export default ingredientsReducer
