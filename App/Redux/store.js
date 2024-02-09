import {configureStore} from '@reduxjs/toolkit';
import addressReducer from './addressSlice.js';
import cartreducer from './cartslice.js';
export const store = configureStore({
  reducer: {
    cart: cartreducer,
    address: addressReducer,
  },
});
