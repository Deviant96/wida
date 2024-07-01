import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addInvoice } from '../store/invoiceSlice';
import { Invoice, Product } from '../types';
import { AppDispatch } from '../store/store';
import Select from 'react-select';
import { AiFillProduct } from 'react-icons/ai';
import axios from 'axios';
import { formatRupiah } from '../utils/formatCurrency';

interface InvoiceFormProps {
  onClose: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onClose }) => {
  const [date, setDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [salespersonName, setSalespersonName] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);
  const productsApiEnpoint: string = import.meta.env.VITE_ALL_PRODUCTS_API_ENDPOINT as string;

  const fetchProducts = async () => {
    try {
      setIsLoadingProducts(true);
      const response = await axios.get(productsApiEnpoint);
      setProductSuggestions(response.data);
      setIsLoadingProducts(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setIsLoadingProducts(false);
    }
  };

  const handleProductFocus = () => {
    if (productSuggestions.length === 0) {
      fetchProducts();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProductChange = (selectedOptions: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedProducts(selectedOptions.map((option: { value: any }) => ({
      ...option.value
    })));
  };

  const handleAddInvoice = () => {
    if (!customerName || !salespersonName || !date || selectedProducts.length === 0) {
      alert('Please fill all the required fields');
      return;
    }

    const totalAmount = selectedProducts.reduce((acc, product) => acc + product.price, 0);
    console.log('totalAmount', totalAmount)

    const newInvoice: Invoice = {
      // id: Date.now(),
      date,
      customerName,
      salespersonName,
      notes,
      products: selectedProducts,
      totalAmount,
    };
    console.log('newInvoice', newInvoice)

    dispatch(addInvoice(newInvoice));
    onClose();
  };
  console.log('selectedProducts', selectedProducts)

  const productOptions = productSuggestions.map((product) => ({
    value: product,
    label: (
      <div key={product.id} className="flex flex-row items-center justify-between">
        <div className="flex items-center justify-between">
          {product.picture ?
            <img src={product.picture} alt={product.name} className="w-8 h-8 mr-2" />
          : <AiFillProduct className='mr-2 h-8 w-8' />}
          <span>{product.name}</span>
        </div>
        <div>
          <span className='ml-2 text-gray-500 text-sm'>Stock: {product.stock}</span>
          <span className='ml-2 text-gray-500 text-sm'>{formatRupiah(product.price)}</span>
        </div>
      </div>
    ),
  }));

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
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Products Sold</label>
          <Select
            isMulti
            options={productOptions}
            onFocus={handleProductFocus}
            onChange={handleProductChange}
            isLoading={isLoadingProducts}
            className="mt-1"
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
