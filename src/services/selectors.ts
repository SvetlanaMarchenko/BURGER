import { createSelector } from 'reselect';

interface OrderState {
  orderId: number | null;
  isLoading: boolean;
  errorInOrder: boolean | null;
}

interface AppState {
  orderBurger: OrderState;
}

const getCurrentOrderState = (state: AppState) => state.orderBurger;

interface CurrentOrderDetails {
  orderId: number | null;
  isLoading: boolean;
  errorInOrder: boolean | null;
}


export const SelectCurrentOrderDetails = createSelector(
  [getCurrentOrderState],
  (order): CurrentOrderDetails => ({
    orderId: order?.orderId ?? null,
    isLoading: order?.isLoading ?? false,
    errorInOrder: order?.errorInOrder ?? null,
  })
);
