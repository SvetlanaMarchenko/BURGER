import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_CLEAR_ORDERS,
  WS_PERS_CONNECTION_START,
  WS_PERS_SEND_MESSAGE
} from  '../../services/actions/ws-action-types';

import { WS_PERS_CLEAR_ORDERS, 
        WS_PERS_CONNECTION_SUCCESS, 
        WS_PERS_CONNECTION_CLOSED, 
        WS_PERS_CONNECTION_ERROR 
} from '../../services/actions/ws-personal-action-types';


export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWSPersConnectionSuccessAction {
  readonly type: typeof WS_PERS_CONNECTION_SUCCESS;
}


export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSPersConnectionErrorAction {
  readonly type: typeof WS_PERS_CONNECTION_ERROR;
  readonly payload: Event;
}

export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWSPersConnectionClosedAction {
  readonly type: typeof WS_PERS_CONNECTION_CLOSED;
}


export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: {message: string};
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: string;
}

export interface TWSClearOrdersAction {
  type: typeof WS_CLEAR_ORDERS;
}

export interface TWSClearPersOrdersAction {
  type: typeof WS_PERS_CLEAR_ORDERS;
}

export interface IWSPersonalConnectionStart {
  type: typeof WS_PERS_CONNECTION_START;
}

export interface IWSSendPersonalMessageAction {
  readonly type: typeof WS_PERS_SEND_MESSAGE;
  readonly payload: {message: string};
}



export type TWSActions =
  | IWSConnectionStart
  | IWSConnectionSuccessAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSSendMessageAction
  | TWSClearOrdersAction
  | IWSPersonalConnectionStart
  | IWSSendPersonalMessageAction
  | TWSClearPersOrdersAction
  | IWSPersConnectionSuccessAction
  | IWSPersConnectionClosedAction
  | IWSPersConnectionErrorAction
  | IWSGetMessageAction
  