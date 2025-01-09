import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { ThunkDispatch } from 'redux-thunk';
import { socketMiddleware } from './middleware/socketMiddleware'; // Импортируем middleware

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

import { Action } from 'redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsUrl))
});

// export type RootState = ReturnType<typeof rootReducer>;

// export type AppDispatch = ThunkDispatch<RootState, undefined, Action>;

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type RootState = ReturnType<typeof store.getState>;
export type AppActions = Action<string>;

// export const useDispatch = dispatchHook.withType <AppDispatch>() 
// export const useSelector = selectorHook.withType <RootState>() 









export default store;