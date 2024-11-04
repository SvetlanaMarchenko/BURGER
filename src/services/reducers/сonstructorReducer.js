import { createSlice } from '@reduxjs/toolkit'

const constructorSlice = createSlice({
  name: 'constructor',
  initialState: {
    ingredientsInConstructor: []
  },
  reducers: {
    addIngredient: (state, action) => {
      state.ingredientsInConstructor.push(action.payload)
    },
    removeIngredient: (state, action) => {
      state.ingredientsInConstructor = state.ingredientsInConstructor.filter(
        ingredient => ingredient.id !== action.payload
      )
    },
    clearConstructor: (state) => {
      state.ingredientsInConstructor = []
    }
  }
})

export const { addIngredient, removeIngredient, clearConstructor } = constructorSlice.actions

export default constructorSlice.reducer
