import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { ThunkAction } from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from './actions/ws-action-types';

import type { TWSActions } from '../utils/types/actions';

export type TWSStoreActions = {
  wsInit: typeof  WS_CONNECTION_START,
  wsSendMessage: typeof  WS_SEND_MESSAGE,
  onOpen: typeof  WS_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED,
  onError: typeof  WS_CONNECTION_ERROR,
  onMessage: typeof  WS_GET_MESSAGE,
};

// Определяем действия для WebSocket
const wsActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

// Создаем store с помощью Redux Toolkit
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsActions)),
  devTools: true, // Включение DevTools
});

// Типизация для приложения
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppActions = TWSActions;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export default store;
