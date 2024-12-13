import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { thunk } from 'redux-thunk';
import { ThunkDispatch } from 'redux-thunk';

import { Action } from 'redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<RootState, undefined, Action>;

export default store;