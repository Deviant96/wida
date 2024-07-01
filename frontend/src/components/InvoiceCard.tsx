import React from 'react';
import { Invoice } from '../types';
import { FaCalendarAlt, FaStickyNote, FaUser } from 'react-icons/fa';
import { format } from 'date-fns';
import { BiMoney } from 'react-icons/bi';

interface InvoiceCardProps {
  invoice: Invoice;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({ invoice }) => {
  const formattedDate = format(new Date(invoice.date), 'PPPP');

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mb-6 flex flex-col sm:flex-row items-center sm:items-start">
      <div className="flex-grow sm:mr-4">
        <h3 className="text-xl font-bold text-gray-900">{invoice.customerName}</h3>
        <p className="text-sm text-gray-500 flex items-center mt-1">
          <FaCalendarAlt className="mr-2 text-gray-600" /> {formattedDate}
        </p>
        <p className="text-sm text-gray-700 flex items-center mt-1">
          <FaUser className="mr-2 text-gray-600" /> Salesperson: {invoice.salespersonName}
        </p>
        <p className="text-sm text-gray-700 flex items-center mt-1">
          <FaStickyNote className="mr-2 text-gray-600" /> Notes: {invoice.notes}
        </p>
      </div>
      <div className="flex items-center sm:flex-col">
        <p className="text-lg font-semibold text-green-700 flex items-center mt-4 sm:mt-0 sm:ml-4">
          <BiMoney className="mr-2 text-green-500" /> Rp{invoice.totalAmount}
        </p>
      </div>
    </div>
  );
};

export default InvoiceCard;
