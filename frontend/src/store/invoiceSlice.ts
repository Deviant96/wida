import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateInvoice, apiFetchInvoices } from "../api/invoiceApi";
import { AppDispatch, RootState } from "./store";

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState
  dispatch: AppDispatch
  rejectValue: string
  extra: { s: string; n: number }
}>()

interface Product {
  name: string;
  picture: string;
  stock: number;
  price: number;
}

interface Invoice {
  id: number;
  date: string;
  customerName: string;
  salespersonName: string;
  notes: string;
  products: Product[];
  totalAmount: number;
}

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
    const response = await apiCreateInvoice(newInvoice);
    return response.data;
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
