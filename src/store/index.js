import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import counterReducer from '../reduser';

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer },
    middleware: [thunk]   
  })
};

const store = makeStore();

export default store;