import { Action, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { socketMiddleware } from './middleware/socket-middleware-2';
import { socketMiddlewarePersonal } from './middleware/socket-middleware-personal';

import type { TWSActions } from '../utils/types/actions';


const parsedAccessToken = localStorage.getItem('accessToken')?.split(' ')[1] || '';
// const wsUrlPers = `wss://norma.nomoreparties.space/orders?token=${parsedAccessToken}`;
// const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const wsAll = socketMiddleware(
  'wss://norma.nomoreparties.space/orders/all',
  {
    start: 'WS_CONNECTION_START',
    stop: 'WS_CONNECTION_CLOSE',
    stopped: 'WS_CONNECTION_CLOSED',
    connectedSuccessfully: 'WS_CONNECTION_SUCCESS',
    error: 'WS_CONNECTION_ERROR',
    messageRecieved: 'WS_GET_MESSAGE',
  },
  false
);

const wsPersonal = socketMiddleware(
  'wss://norma.nomoreparties.space/orders?',
  {
    start: 'WS_PERS_CONNECTION_START',
    stop: 'WS_PERS_CONNECTION_CLOSE',
    stopped: 'WS_PERS_CONNECTION_CLOSED',
    connectedSuccessfully: 'WS_PERS_CONNECTION_SUCCESS',
    error: 'WS_PERS_CONNECTION_ERROR',
    messageRecieved: 'WS_PERS_GET_MESSAGE',
  },
  true
);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      wsAll,
      wsPersonal
    ),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action>;

export type AppActions = TWSActions;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export default store;
