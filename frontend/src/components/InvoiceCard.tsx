import React from 'react';
import { Invoice } from '../types';

interface InvoiceCardProps {
  invoice: Invoice;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice }) => {
  return (
    <div>
      <h3>{invoice.customerName}</h3>
      <p>{invoice.salespersonName}</p>
      <p>{invoice.date}</p>
      <p>{invoice.notes}</p>
      <p>Total: ${invoice.totalAmount}</p>
    </div>
  );
};

export default InvoiceCard;
