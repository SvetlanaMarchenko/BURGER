import { createSelector } from 'reselect';

const getCurrentOrderState = state => state.orderBurger || {};

export const selectCurrentOrderDetails = createSelector(
  [getCurrentOrderState], 
  (order) => ({
    orderId: order?.orderId ?? null, 
    isLoading: order?.isLoading ?? false, 
    errorInOrder: order?.errorInOrder ?? null, 
  })
);
