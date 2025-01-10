import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware'; 

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from './actions/ws-action-types';

import { Action } from 'redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsUrl))
});

// export type RootState = ReturnType<typeof rootReducer>;

// export type AppDispatch = ThunkDispatch<RootState, undefined, Action>;

// export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppActions = Action<string>;

// export const useDispatch = dispatchHook.withType <AppDispatch>() 
// export const useSelector = selectorHook.withType <RootState>() 



export type AppActions = TWSActions | TUserActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export type TWSStoreActions = {
  wsInit: typeof  WS_CONNECTION_START,
  wsSendMessage: typeof  WS_SEND_MESSAGE,
  onOpen: typeof  WS_CONNECTION_SUCCESS,
  onClose: typeof WS_CONNECTION_CLOSED,
  onError: typeof  WS_CONNECTION_ERROR,
  onMessage: typeof  WS_GET_MESSAGE,
};

// export * from './modelsData';
// export * from './actions';









export default store;