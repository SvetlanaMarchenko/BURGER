import { combineReducers } from '@reduxjs/toolkit';
import constructorReducer from './reducers/сonstructorReducer';
import orderReducer from './reducers/orderReducer';
import ingredientsReducer from './reducers/ingredientsReducer';


const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  order: orderReducer
})

export default rootReducer
