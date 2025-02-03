import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CLEAR_ORDERS, 
} from '../actions/ws-action-types';
import type { TWSActions } from '../../utils/types/actions';

type TWSState = {
  wsConnected: boolean;
  orders: []; 
  total: number;
  totalToday: number;
  error?: Event;
};

const initialState: TWSState = {
  wsConnected: false,
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
      const parsedMessage = action.payload;
      return {
        ...state,
        error: undefined,
        orders: parsedMessage.orders,
        total: parsedMessage.total,
        totalToday: parsedMessage.totalToday,
      };

    case WS_CLEAR_ORDERS: 
      return {
        ...initialState,
        wsConnected: state.wsConnected,
      };

    default:
      return state;
  }
};
