import { WS_PERS_CLEAR_ORDERS, WS_PERS_CONNECTION_CLOSE, WS_PERS_CONNECTION_CLOSED, WS_PERS_CONNECTION_ERROR, WS_PERS_CONNECTION_SUCCESS, WS_PERS_GET_MESSAGE } from '../actions/ws-personal-action-types';
import { wsPersonalReducer, initialState } from './ws-personal-reducers';

describe('wsPersonalReducer', () => {

  it('should return the initial state', () => {
    expect(wsPersonalReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle WS_PERS_CONNECTION_SUCCESS case', () => {
    const action = {
      type: WS_PERS_CONNECTION_SUCCESS,
    };
    
    const expectedState = {
      ...initialState,
      error: undefined, 
        wsConnected: true,
    };
    expect(wsPersonalReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle WS_PERS_CONNECTION_ERROR case', () => {
    const error = new Event('error');

    const action = {
        type: WS_PERS_CONNECTION_ERROR,
        payload: error,
        
      };
    const expectedState = {
        ...initialState,
        error: error, 
        wsConnected: false,
    }
    expect(wsPersonalReducer(initialState, action)).toEqual(expectedState);
    });

it('should handle WS_PERS_CONNECTION_CLOSED case', () => {

    const action = {
        type: WS_PERS_CONNECTION_CLOSED,
        
        };
    const expectedState = {
        ...initialState,
        error: undefined,
        wsConnected: false,
    }
    expect(wsPersonalReducer(initialState, action)).toEqual(expectedState);
    });

it('should handle WS_PERS_CONNECTION_CLOSE case', () => {

    const action = {
        type: WS_PERS_CONNECTION_CLOSE,
        
        };
    const expectedState = {
        ...initialState,
        error: undefined,
        wsConnected: false,
    }
    expect(wsPersonalReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle WS_PERS_GET_MESSAGE', () => {
        const action = {
          type: WS_PERS_GET_MESSAGE,
          payload: {
            orders: [{ id: 1, name: 'Order 1' }, { id: 2, name: 'Order 2' }],
            total: 100,
            totalToday: 50,
          },
        };
        const expectedState = {
          ...initialState,
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          error: undefined
        };
        expect(wsPersonalReducer(initialState, action)).toEqual(expectedState);
      });

      it('should handle WS_PERS_CLEAR_ORDERS', () => {
        const action = {
          type: WS_PERS_CLEAR_ORDERS,
        };
        const expectedState = {
          ...initialState,
          wsConnected: false
        };
        expect(wsPersonalReducer(initialState, action)).toEqual(expectedState);
      });
});


