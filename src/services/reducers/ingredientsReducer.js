import {createSlice} from '@reduxjs/toolkit';

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    allIngredients: [],
    currentIngredient: null,
    error: null,
    isLoading: true
  },
  reducers: {
    setIngredients: (state, action) => {
      state.allIngredients = action.payload,
      state.isLoading = false
    },
    setCurrentIngredient: (state, action) => {
      state.currentIngredient = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload,
      state.isLoading = false
    },
    setIsLoading: (state,action) => {
      state.isLoading = action.payload
    }
  }
})

export const { setIngredients, setCurrentIngredient, setError,  setIsLoading} = ingredientsSlice.actions
export default ingredientsSlice.reducer