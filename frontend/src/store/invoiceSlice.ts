import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateInvoice, apiFetchInvoices } from "../api/invoiceApi";
import { AppDispatch, RootState } from "./store";
import { Invoice } from "../types";

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
  extra: { s: string; n: number }
}>()

interface InvoicesState {
  invoices: Invoice[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InvoicesState = {
  invoices: [],
  status: "idle",
  error: null,
};

export const fetchInvoices = createAppAsyncThunk(
  "invoices/fetchInvoices",
  async () => {
    const response = await apiFetchInvoices();
    return response;
  }
);

export const addInvoice = createAppAsyncThunk(
  "invoices/addInvoice",
  async (newInvoice: Invoice) => {
    try {
      const response = await apiCreateInvoice(newInvoice);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return err;
    }
  }
);

const invoicesSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    setInvoices: (state, action) => {
      state.invoices = action.payload;
      // console.log('action.payload', action.payload)
      // console.log('state.invoices', state.invoices)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchInvoices.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.invoices = action.payload;
        }
      )
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch invoices";
      })
      .addCase(
        addInvoice.fulfilled,
        (state, action) => {
          state.invoices.push(action.payload);
        }
      )
      .addCase(addInvoice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addInvoice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add invoice';
      });
  },
});

export const { setInvoices } = invoicesSlice.actions;

export default invoicesSlice.reducer;
