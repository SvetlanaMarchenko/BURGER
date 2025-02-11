import {
  WS_PERS_CONNECTION_SUCCESS,
  WS_PERS_CONNECTION_ERROR,
  WS_PERS_CONNECTION_CLOSED,
  WS_PERS_CONNECTION_CLOSE,
  WS_PERS_GET_MESSAGE,
  WS_PERS_CLEAR_ORDERS,
} from '../actions/ws-personal-action-types';
import type { TWSActions } from '../../utils/types/actions';
import { RawOrder } from '../../utils/types/raw-orders';


type TWSState = {
  wsConnected: boolean;
  orders: RawOrder []; 
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

export const wsPersonalReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_PERS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined, 
        wsConnected: true,
      };

    case WS_PERS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload, 
        wsConnected: false,
      };

    case WS_PERS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false,
      };

      case WS_PERS_CONNECTION_CLOSE:
        return {
          ...state,
          error: undefined,
          wsConnected: false,
        };

    case WS_PERS_GET_MESSAGE:
      const { orders, total, totalToday } = action.payload;
      return {
        ...state,
        error: undefined, 
        orders,      
        total,     
        totalToday,
      };

    case WS_PERS_CLEAR_ORDERS:
      return {
        ...initialState,
        wsConnected: state.wsConnected,
      };

    default:
      return state;
  }
};
