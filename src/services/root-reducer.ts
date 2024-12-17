
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/ingredients-reducer';
import constructorReducer from './reducers/сonstructor-reducer'
import currentIngredientReducer from './reducers/current-ingredient-reducer';
import orderReducer from './reducers/order-reducer';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  orderBurger: orderReducer,
});

export default rootReducer;