export const SET_CURRENT_INGREDIENT = 'SET_CURRENT_INGREDIENT';
export const REMOVE_CURRENT_INGREDIENT = 'REMOVE_CURRENT_INGREDIENT';

export const addCurrentIngredient= (ingredient) => ({
  type: SET_CURRENT_INGREDIENT,
  payload: ingredient
})

export const removeCurrentIngredient= () => ({
  type: REMOVE_CURRENT_INGREDIENT
})


