
import { combineReducers } from '@reduxjs/toolkit'
import ingredientsReducer from './reducers/ingredients-reducer'
import constructorReducer from './reducers/сonstructor-reducer'
import currentIngredientReducer from './reducers/current-ingredient-reducer'
import orderReducer from './reducers/order-reducer'
// import userReducer from "./user";

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  orderBurger: orderReducer,
  // user: userReducer
  
});

export default rootReducer



// import {configureStore} from "@reduxjs/toolkit";
// import userReducer from "./user";

// export const store = configureStore({
//     reducer: {
//         user: userReducer,
//     },
// });


