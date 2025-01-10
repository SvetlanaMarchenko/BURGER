import {
  // JOIN_CHAT,
  // JOIN_CHAT_FAILED,
  // JOIN_CHAT_SUCCESS,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START,
} from  '../../services/actions/ws-action-types';

import type { IMessage } from "../types/modelsData";

// export interface IJoinChatAction {
//   readonly type: typeof JOIN_CHAT;
// }

// export interface IJoinChatFailedAction {
//   readonly type: typeof JOIN_CHAT_FAILED;
// }

// export interface IJoinChatSuccessAction {
//   readonly type: typeof JOIN_CHAT_SUCCESS;
//   readonly user: IUserResponse;
// }

// export type TUserActions =
//   | IJoinChatAction
//   | IJoinChatFailedAction
//   | IJoinChatSuccessAction;

export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IMessage;
}

export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: {message: string};
}

export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSSendMessageAction;