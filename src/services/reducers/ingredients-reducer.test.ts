// Mock the API request
jest.mock('../../utils/api', () => ({
  requestFromApi: jest.fn().mockResolvedValue([]),
}));

import { Ingredient } from '../../utils/types/ingredients';
import { FETCH_INGREDIENTS_FAILURE, FETCH_INGREDIENTS_REQUEST, FETCH_INGREDIENTS_SUCCESS } from '../actions/ingredients-actions';
import ingredientsReducer from './ingredients-reducer';
import {initialState} from "./ingredients-reducer"

describe('IngredientsReducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle FETCH_INGREDIENTS_REQUEST case', () => {
    const action = {
      type: FETCH_INGREDIENTS_REQUEST,
    };

    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true, 
      error: null,
    });
  });

  it('should handle FETCH_INGREDIENTS_SUCCESS case', () => {
    const mockIngredients: Ingredient[] = [
      {
        _id: "643d69a5c3f7b9001cfa093c",
        id: "2",
        key: "2",
        name: "Краторная булка N-200i",
        type: "bun",
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: "https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png"
      },
    ];

    const action = {
      type: FETCH_INGREDIENTS_SUCCESS,
      payload: mockIngredients,
    };

    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      allIngredients: mockIngredients,
    });
  });

  it('should handle FETCH_INGREDIENTS_FAILURE case', () => {
    const errorMessage = 'Oooooops errroooorrr';

    const action = {
      type: FETCH_INGREDIENTS_FAILURE,
      payload: errorMessage,
    };

    const expectedState = {
      ...initialState,
      isLoading: false,
      error: errorMessage, 
    };

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });
});
