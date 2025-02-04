import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_PERS_CONNECTION_START
} from '../../services/actions/ws-action-types';
import type {TWSActions } from './actions';
import store from '../../services/store';
import { WS_PERS_CONNECTION_CLOSED, WS_PERS_CONNECTION_ERROR, WS_PERS_CONNECTION_SUCCESS, WS_PERS_GET_MESSAGE } from '../../services/actions/ws-personal-action-types';


export type AppActions = TWSActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActions>;

export type TWSStoreActions = {

  start: typeof WS_PERS_CONNECTION_START | typeof  WS_CONNECTION_START
  stop: typeof WS_CONNECTION_CLOSED | typeof WS_CONNECTION_CLOSED
  stopped: typeof WS_PERS_CONNECTION_CLOSED | typeof WS_CONNECTION_CLOSED
  connectedSuccessfully: typeof WS_PERS_CONNECTION_SUCCESS | typeof WS_CONNECTION_SUCCESS
  error: typeof WS_PERS_CONNECTION_ERROR | typeof WS_CONNECTION_ERROR
  messageRecieved: typeof WS_PERS_GET_MESSAGE | typeof WS_GET_MESSAGE

};

export * from './modelsData';
export * from './actions';