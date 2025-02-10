import { Ingredient } from '../../utils/types/ingredients';

export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const CLEAR_CURRENT_INGREDIENT = 'CLEAR_CURRENT_INGREDIENT';

export interface SetCurrentIngredientAction {
  type: typeof SET_CURRENT_INGREDIENT;
  payload: Ingredient; 
}

export interface ClearCurrentIngredientAction {
  type: typeof CLEAR_CURRENT_INGREDIENT;
}

export const setCurrentIngredient = (ingredient: Ingredient): SetCurrentIngredientAction => ({
  type: SET_CURRENT_INGREDIENT,
  payload: ingredient
});

export const clearCurrentIngredient = (): ClearCurrentIngredientAction => ({
  type: CLEAR_CURRENT_INGREDIENT,
});

export type ConstructorActions =
  | SetCurrentIngredientAction
  | ClearCurrentIngredientAction
