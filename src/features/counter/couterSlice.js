import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'color',
  initialState: {
    value: true,
  },
  reducers: {
    setColor: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = !state.value
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setColor } = counterSlice.actions

export default counterSlice.reducer