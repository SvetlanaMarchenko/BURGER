
import { combineReducers } from '@reduxjs/toolkit'
import ingredientsReducer from './reducers/ingredients-reducer'
import constructorReducer from './reducers/сonstructor-reducer'
import currentIngredientReducer from './reducers/current-ingredient-reducer'
// import orderReducer from './reducers/orderReducer'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  // orderState: orderReducer,
});

export default rootReducer