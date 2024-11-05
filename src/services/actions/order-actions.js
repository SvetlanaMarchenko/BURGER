// export const CREATE_ORDER_REQUEST = 'CREATE_ORDER_REQUEST';
// export const CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS';
// export const CREATE_ORDER_FAILURE = 'CREATE_ORDER_FAILURE';

// const ORDER_INGREDIENT_API_URL = 'https://norma.nomoreparties.space/api/orders';

// export const createOrder = (ingredients) => async (dispatch) => {
//   dispatch({ type: CREATE_ORDER_REQUEST });
//   try {
//     const response = await fetch(ORDER_INGREDIENT_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ ingredients }),
//     });
//     const data = await response.json();
//     if (!response.ok) throw new Error(`Error ${response.status}`);
//       dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order.number });
//   } catch (error) {
//       dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
//   }
// };


