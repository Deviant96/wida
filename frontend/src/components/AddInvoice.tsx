import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../store/invoiceSlice';


const AddInvoice = () => {
  const [invoice, setInvoice] = useState({
    date: '',
    customerName: '',
    salespersonName: '',
    notes: '',
    products: [],
    totalAmount: 0,
  });

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addInvoice(invoice));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Date</label>
        <input type="date" name="date" value={invoice.date} onChange={handleChange} required />
      </div>
      <div>
        <label>Customer Name</label>
        <input type="text" name="customerName" value={invoice.customerName} onChange={handleChange} required />
      </div>
      <div>
        <label>Salesperson Name</label>
        <input type="text" name="salespersonName" value={invoice.salespersonName} onChange={handleChange} required />
      </div>
      <div>
        <label>Notes</label>
        <textarea name="notes" value={invoice.notes} onChange={handleChange}></textarea>
      </div>
      <button type="submit">Add Invoice</button>
    </form>
  );
};

export default AddInvoice;
