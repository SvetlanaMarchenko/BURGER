import { Ingredient } from '../../utils/types/ingredients'; 
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_BUN = 'SET_BUN';
export const REMOVE_BUN = 'REMOVE_BUN';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';
export const REPLACE_INGREDIENT = 'REPLACE_INGREDIENT';


interface AddIngredientAction {
  type: typeof ADD_INGREDIENT;
  payload: Ingredient & { key: number }; 
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

export type ConstructorActions =
  | AddIngredientAction
  | RemoveIngredientAction
  | SetBunAction
  | RemoveBunAction
  | ClearConstructorAction
  | ReplaceIngredientAction;

export const addIngredient = (ingredient: Ingredient): AddIngredientAction => ({
  type: ADD_INGREDIENT,
  payload: { ...ingredient, key: Math.random() },
});

export const removeIngredient = (index: number): RemoveIngredientAction => ({
  type: REMOVE_INGREDIENT,
  payload: index,
});

export const setBun = (bun: Ingredient): SetBunAction => ({
  type: SET_BUN,
  payload: bun,
});

export const removeBun = (): RemoveBunAction => ({
  type: REMOVE_BUN,
});

export const clearConstructor = (): ClearConstructorAction => ({
  type: CLEAR_CONSTRUCTOR,
});

export const replaceIngredient = (
  fromIndex: number,
  toIndex: number
): ReplaceIngredientAction => ({
  type: REPLACE_INGREDIENT,
  fromIndex,
  toIndex,
});
