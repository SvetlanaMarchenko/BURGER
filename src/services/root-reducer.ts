
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredients-reducer';
import constructorReducer from './reducers/сonstructor-reducer'
import currentIngredientReducer from './reducers/current-ingredient-reducer';
import orderReducer from './reducers/order-reducer';
import { wsReducer } from './reducers/ws-reducers';
import { wsPersonalReducer } from './reducers/ws-personal-reducers'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  orderBurger: orderReducer,
  wsReducer: wsReducer,
  wsPersonalReducer: wsPersonalReducer
});




export default rootReducer;