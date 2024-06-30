import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store/store';
import { addInvoice } from '../store/invoiceSlice';
import { Product } from '../types';
import { AppDispatch } from '../store/store';

const InvoiceForm: React.FC = () => {
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [salespersonName, setSalespersonName] = useState('');
  const [notes, setNotes] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, setProducts] = useState<Product[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<AppDispatch>();

  const handleAddInvoice = () => {
    const newInvoice = {
      id: Date.now(),
      date,
      customerName,
      salespersonName,
      notes,
      products,
      totalAmount: products.reduce((sum, product) => sum + product.price, 0),
    };
    dispatch(addInvoice(newInvoice));
  };

  return (
    <div>
      <h2>Add Invoice</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddInvoice(); }}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required placeholder="Customer Name" />
        <input type="text" value={salespersonName} onChange={(e) => setSalespersonName(e.target.value)} required placeholder="Salesperson Name" />
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes"></textarea>
        {/* Add product input fields */}
        <button type="submit">Add Invoice</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
