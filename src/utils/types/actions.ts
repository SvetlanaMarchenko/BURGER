import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_CLEAR_ORDERS,
  WS_PERS_CONNECTION_START,
  WS_PERS_SEND_MESSAGE,
  WS_CONNECTION_CLOSE
} from  '../../services/actions/ws-action-types';

import { WS_PERS_CLEAR_ORDERS, 
        WS_PERS_CONNECTION_SUCCESS, 
        WS_PERS_CONNECTION_CLOSED, 
        WS_PERS_CONNECTION_CLOSE,
        WS_PERS_CONNECTION_ERROR,
        WS_PERS_GET_MESSAGE
} from '../../services/actions/ws-personal-action-types';
import { RawOrder } from './raw-orders';




export interface IWSConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload?: never; // Этот action не имеет payload
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload?: never; // Этот action не имеет payload
}

export interface IWSPersConnectionSuccessAction {
  readonly type: typeof WS_PERS_CONNECTION_SUCCESS;
  readonly payload?: never; // Этот action не имеет payload
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
  readonly payload?: never; // Этот action не имеет payload
}

export interface IWSPersConnectionClosedAction {
  readonly type: typeof WS_PERS_CONNECTION_CLOSED;
  readonly payload?: never; // Этот action не имеет payload
}

export interface IWSConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE;
  readonly payload?: never; // Этот action не имеет payload
}

export interface IWSPersConnectionCloseAction {
  readonly type: typeof WS_PERS_CONNECTION_CLOSE;
  readonly payload?: never; // Этот action не имеет payload
}

export interface IWSSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: string; // Для этого действия ожидается строка
}

export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: {
    orders: RawOrder[];     // Массив заказов
    total: number;       // Общая сумма
    totalToday: number;  // Общая сумма за сегодня
  };
}

export interface IWSPersGetMessageAction {
  readonly type: typeof WS_PERS_GET_MESSAGE;
  readonly payload: {
    orders: RawOrder[];     // Массив заказов
    total: number;       // Общая сумма
    totalToday: number;  // Общая сумма за сегодня
  };
}

export interface TWSClearOrdersAction {
  readonly type: typeof WS_CLEAR_ORDERS;
  readonly payload?: never; // Этот action не имеет payload
}

export interface TWSClearPersOrdersAction {
  readonly type: typeof WS_PERS_CLEAR_ORDERS;
  readonly payload?: never; // Этот action не имеет payload
}

export interface IWSPersonalConnectionStart {
  readonly type: typeof WS_PERS_CONNECTION_START;
  readonly payload?: never; // Этот action не имеет payload
}

export interface IWSSendPersonalMessageAction {
  readonly type: typeof WS_PERS_SEND_MESSAGE;
  readonly payload: { message: string }; // Для этого действия ожидается объект с сообщением
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
  | IWSPersGetMessageAction
  | IWSPersConnectionCloseAction
  | IWSConnectionCloseAction
