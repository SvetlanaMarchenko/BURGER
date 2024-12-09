import { createSelector } from 'reselect';

const getCurrentOrderState = state => state.orderBurger || {};


// interface OrderDetailsState{
//   orderId: number, 
//   isLoading: boolean, 
//   errorInOrder: boolean
// }

export const selectCurrentOrderDetails = createSelector(
  [getCurrentOrderState], 
  (order) => ({
    orderId: order?.orderId ?? null, 
    isLoading: order?.isLoading ?? false, 
    errorInOrder: order?.errorInOrder ?? null, 
  })
);
