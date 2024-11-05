
import { combineReducers } from '@reduxjs/toolkit'
import ingredientsReducer from './reducers/ingredientsReducer'
import constructorReducer from './reducers/сonstructorReducer'
import currentIngredientReducer from './reducers/currentIngredientReducer'
// import orderReducer from './reducers/orderReducer'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorIngredient: constructorReducer,
  currentIngredient: currentIngredientReducer,
  // orderState: orderReducer,
});

export default rootReducer