import { configureStore, Store } from '@reduxjs/toolkit';
import invoicesReducer from './invoiceSlice';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

export const store: Store = configureStore({
  reducer: {
    invoices: invoicesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useReduxDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector
