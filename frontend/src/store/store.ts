import { configureStore, Store } from '@reduxjs/toolkit';
import invoicesReducer from './invoiceSlice';

const store: Store = configureStore({
  reducer: {
    invoices: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;