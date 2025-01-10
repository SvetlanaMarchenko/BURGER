import type { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { store } from '../store';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from '../action-types';
import type { TUserActions, TWSActions } from './actions';

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

export * from './modelsData';
export * from './actions';