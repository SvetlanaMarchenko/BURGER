export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const SET_BUN = 'SET_BUN';
export const REMOVE_BUN = 'REMOVE_BUN';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addIngredient= (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: ingredient
})

export const removeIngredient= (ingredientId) => ({
  type: REMOVE_INGREDIENT,
  payload: ingredientId
})

export const setBun = (bun) => ({
  type: SET_BUN,
  payload: bun,
});

export const removeBun = () => ({
  type: REMOVE_BUN,
});

export const clearConstructor= () => ({
  type: CLEAR_CONSTRUCTOR
})





