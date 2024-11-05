export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const addIngredient= (ingredient) => ({
  type: ADD_INGREDIENT,
  payload: ingredient
})

export const removeIngredient= (id) => ({
  type: REMOVE_INGREDIENT,
  payload: id
})

export const clearConstructor= () => ({
  type: CLEAR_CONSTRUCTOR
})


