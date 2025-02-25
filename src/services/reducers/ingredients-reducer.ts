import { Ingredient } from '../../utils/types/ingredients';
import {
  FETCH_INGREDIENTS_REQUEST,
  FETCH_INGREDIENTS_SUCCESS,
  FETCH_INGREDIENTS_FAILURE,
} from '../actions/ingredients-actions';

interface FetchIngredientsRequestAction {
  type: typeof FETCH_INGREDIENTS_REQUEST;
}

interface FetchIngredientsSuccessAction {
  type: typeof FETCH_INGREDIENTS_SUCCESS;
  payload: Ingredient[]; 
}

interface FetchIngredientsFailureAction {
  type: typeof FETCH_INGREDIENTS_FAILURE;
  payload: string; 
}

type IngredientsActionTypes =
  | FetchIngredientsRequestAction
  | FetchIngredientsSuccessAction
  | FetchIngredientsFailureAction;

interface IngredientsState {
  allIngredients: Ingredient[];
  error: string | null;
  isLoading: boolean;
}

export const initialState: IngredientsState = {
  allIngredients: [],
  error: null,
  isLoading: true
};

const ingredientsReducer = (
  state = initialState,
  action: IngredientsActionTypes
): IngredientsState => {
  switch (action.type) {
    case FETCH_INGREDIENTS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_INGREDIENTS_SUCCESS:
      return { ...state, isLoading: false, allIngredients: action.payload };
    case FETCH_INGREDIENTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default ingredientsReducer;



