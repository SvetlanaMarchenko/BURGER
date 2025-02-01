import {
  WS_PERS_CONNECTION_SUCCESS,
  WS_PERS_CONNECTION_ERROR,
  WS_PERS_CONNECTION_CLOSED,
  WS_PERS_GET_MESSAGE,
  WS_PERS_CLEAR_ORDERS,
} from '../actions/ws-personal-action-types';
import type { TWSActions } from '../../utils/types/actions';
import { Order } from '../../utils/types/orders';


type TWSState = {
  wsConnected: boolean;
  orders: Order[];     
  total: number;         
  totalToday: number;  
  error?: string | null;
  ingredients: string;   
};

const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  ingredients: '',
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
