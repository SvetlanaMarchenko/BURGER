import { Orders } from '../../utils/types/orders';
import { FETCH_ORDERS_FAILURE, FETCH_ORDERS_REQUEST, FETCH_ORDERS_SUCCESS } from '../actions/current-order-actions';
import { AppActions } from '../store';

interface OrdersState {
  orders: Orders | [];
  loading: boolean;
  error: string | null;
  currentOrder: Orders | null; // Чтобы хранить текущий заказ
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  currentOrder: null, // Начальное значение для текущего заказа
};

export const ordersReducer = (state = initialState, action: AppActions): OrdersState => {
  switch (action.type) {
    case FETCH_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload, // Применяем полученные заказы
        loading: false,
        error: null,
      };

    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload, // Сохраняем ошибку в состоянии
      };

    case 'SET_CURRENT_ORDER': // Обработаем действие для установки текущего заказа
      return {
        ...state,
        currentOrder: action.payload,
      };

    default:
      return state;
  }
};
