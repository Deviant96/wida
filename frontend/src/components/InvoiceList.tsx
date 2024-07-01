import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import InvoiceCard from './InvoiceCard';
import { Invoice } from '../types';
import Modal from './Modal';
import InvoiceForm from './InvoiceForm';
import { PiPlusBold } from 'react-icons/pi';

const PAGE_SIZE = 9;

const InvoiceList: React.FC = () => {
  const invoices = useSelector((state: RootState) => state.invoices.invoices);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalPages = Math.ceil(invoices.length / PAGE_SIZE);
  const paginatedInvoices = invoices.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddInvoice = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
            onClick={handleAddInvoice}
            className="flex items-center gap-2 rounded-full p-4 bg-slate-300 text-[#15294b] hover:bg-slate-400"
          >
          <PiPlusBold />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedInvoices.map((invoice: Invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <InvoiceForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default InvoiceList;
