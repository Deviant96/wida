import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../store/invoiceSlice';
import { Product } from '../types';
import { AppDispatch } from '../store/store';

interface InvoiceFormProps {
  onClose: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onClose }) => {
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [salespersonName, setSalespersonName] = useState('');
  const [notes, setNotes] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [products, setProducts] = useState<Product[]>([]);
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
    onClose();
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Invoice</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleAddInvoice(); }}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Salesperson Name</label>
          <input
            type="text"
            value={salespersonName}
            onChange={(e) => setSalespersonName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
