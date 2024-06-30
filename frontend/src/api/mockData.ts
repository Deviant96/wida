import { Invoice } from '../types';

export const mockInvoices: Invoice[] = [
  {
    id: 1,
    date: '2024-06-30',
    customerName: 'John Doe',
    salespersonName: 'Jane Smith',
    notes: 'Sample notes',
    products: [
      { name: 'Product A', picture: '', stock: 10, price: 100 },
      { name: 'Product B', picture: '', stock: 20, price: 200 },
    ],
    totalAmount: 300,
  },
];
