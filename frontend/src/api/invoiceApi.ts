import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const apiFetchInvoices = async () => {
  const response = await api.get("/invoices");
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiCreateInvoice = async (invoice: any) => {
  const response = await api.post("/invoices", invoice);
  return response.data;
};

export const apiFetchRevenue = async () => {
  const response = await api.get("/invoices/revenue");
  return response.data;
};
