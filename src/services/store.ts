import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { socketMiddleware } from './middleware/socket-middleware';
import { socketMiddlewarePersonal } from './middleware/socket-middleware-personal';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CLEAR_ORDERS
} from './actions/ws-action-types';

import type { TWSActions } from '../utils/types/actions';

const wsActions: TWSActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
  onClear: WS_CLEAR_ORDERS
};

const parsedAccessToken = localStorage.getItem('accessToken')?.split(' ')[1] || '';
const wsUrlPers = `wss://norma.nomoreparties.space/orders?token=${parsedAccessToken}`;
const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsUrl),
      socketMiddlewarePersonal(wsUrlPers)
    ),
  devTools: true, // Включение DevTools
});

// Типизация для приложения
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppActions = TWSActions;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export default store;
