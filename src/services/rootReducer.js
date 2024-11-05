
import { combineReducers } from '@reduxjs/toolkit'
import ingredientsReducer from './reducers/ingredientsReducer'
import constructorReducer from './reducers/сonstructorReducer'
import currentIngredientReducer from './reducers/currentIngredientReducer'
// import orderReducer from './reducers/orderReducer'

const rootReducer = combineReducers({
  ingredientsState: ingredientsReducer,
  constructorState: constructorReducer,
  currentIngredientState: currentIngredientReducer,
  // orderState: orderReducer,
});

export default rootReducer