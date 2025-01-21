import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CLEAR_ORDERS, 
} from '../actions/ws-action-types';
import type { TWSActions } from '../../utils/types/actions';
import type { IMessage } from '../../utils/types/modelsData';

type TWSState = {
  wsConnected: boolean;
  messages: IMessage[];
  orders: []; // Массив заказов
  total: number; // Общее количество заказов
  totalToday: number; // Заказы за сегодня
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
  messages: [],
  orders: [],
  total: 0,
  totalToday: 0,
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      const parsedMessage = JSON.parse(action.payload);
      return {
        ...state,
        error: undefined,
        orders: parsedMessage.orders,
        total: parsedMessage.total,
        totalToday: parsedMessage.totalToday,
      };

    case WS_CLEAR_ORDERS: // Новое действие для сброса заказов
      return {
        ...initialState, // Сбрасываем состояние
        wsConnected: state.wsConnected, // Сохраняем текущее состояние соединения
      };

    default:
      return state;
  }
};
