import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
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

const accessToken = localStorage.getItem('accessToken');
const parsedAccessToken = accessToken ? accessToken.split(' ')[1] : null;

// Определяем URL для WebSocket в зависимости от текущего пути
const locationPathname = window.location.pathname;

const wsActions: TWSActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

// Условие для выбора URL WebSocket
// let wsUrl = 'wss://norma.nomoreparties.space/orders/all'; // Default URL
let wsUrl: string; // Инициализируем переменную wsUrl

if (locationPathname.startsWith('/profile') || locationPathname.startsWith('/profile/orders')) {
  // Если путь начинается с '/profile' или '/profile/orders', используем URL с токеном
  const accessToken = localStorage.getItem('accessToken');
  const parsedAccessToken = accessToken ? accessToken.split(' ')[1] : '';
  
  wsUrl = `wss://norma.nomoreparties.space/orders?token=${parsedAccessToken}`;
} else if (locationPathname.startsWith('/feed') || locationPathname.startsWith('/feed/')) {
  // Если путь начинается с '/feed' или '/feed/', используем URL без токена
  wsUrl = 'wss://norma.nomoreparties.space/orders/all';
}

// Теперь переменная wsUrl будет содержать правильный WebSocket URL в зависимости от пути


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsUrl, wsActions)),
  devTools: true, // Включение DevTools
});

// Типизация для приложения
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppActions = TWSActions;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export default store;

