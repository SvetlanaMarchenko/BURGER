// services/actions/orderActions.js
export const CREATE_INGREDIENTS_REQUEST = 'CREATE_INGREDIENTS_REQUEST'
export const CREATE_INGREDIENTS_SUCCESS = 'CREATE_INGREDIENTS_SUCCESS'
export const FETCH_INGREDIENTS_FAILURE = 'FETCH_INGREDIENTS_FAILURE'

const ORDER_API_URL = 'https://norma.nomoreparties.space/api/ingredients'

export const createOrder = (ingredients) => async (dispatch) => {
  dispatch({ type: CREATE_INGREDIENTS_REQUEST })
  try {
    const response = await fetch(ORDER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingredients }),
    })
    const data = await response.json()
    if (!response.ok) throw new Error(`Error ${response.status}`)
    dispatch({ type: CREATE_INGREDIENTS_SUCCESS, payload: data.order.number })
  } catch (error) {
    dispatch({ type: FETCH_INGREDIENTS_FAILURE, payload: error.message })
  }
};

