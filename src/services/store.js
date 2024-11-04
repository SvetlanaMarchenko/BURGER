import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';


const store = configureStore({
  reducer: rootReducer
  // devTools: composeWithDevTools
})

export default store
