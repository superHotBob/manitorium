import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: true,
  user: {}, 
  admin: false,
  name: '',  
  tickers: '',  
};
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setColor: (state, action) => {
        console.log(state);
      state.color = action.payload;
    },
    setName: (state, action) => {state.name = action.payload},
    setUser: (state, action) => {
      console.log('User for redux', action.payload);
      return {...state, user: action.payload}      
    },
    setAdmin: (state, action) => {state.admin = action.payload},
    setTickers: (state, action) => {     
      return {...state,tickers: action.payload} 
    }  
  },
});

export const {
 setColor , setUser, setTickers, setName , setAdmin
} = counterSlice.actions;

export const new_color = (state) => state.counter.color;
export const name = (state) => state.counter.name;
export const user = (state) => state.counter.user;
export const tickers = (state) => state.counter.tickers;
export const admin = (state) => state.counter.admin; 



export default counterSlice.reducer;
