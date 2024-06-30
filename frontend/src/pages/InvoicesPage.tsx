import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useReduxDispatch, useReduxSelector } from '../store/store';
import InvoiceCard from '../components/InvoiceCard';
import InvoiceForm from '../components/InvoiceForm';
import { fetchInvoices } from '../store/invoiceSlice';
import { Invoice } from '../types';
import TimeSeriesGraph, { transformDataForGraph } from '../components/TimeSeriesGraph';

const InvoicesPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useReduxDispatch();
  const invoices = useReduxSelector((state: RootState) => state.invoices.invoices);
  const invoiceStatus = useSelector((state: RootState) => state.invoices.status);
  const [graphData, setGraphData] = useState<{ date: string, revenue: number }[]>([]);

  useEffect(() => {
    console.log('invoiceStatus', invoiceStatus)
    if (invoiceStatus === 'idle') {
      dispatch(fetchInvoices());
    }
  }, [invoiceStatus, dispatch]);

  useEffect(() => {
    if (invoices.length > 0) {
      setGraphData(transformDataForGraph(invoices, 'daily'));
    }
  }, [invoices]);

  return (
    <div>
      <InvoiceForm />
      <div>
        {Array.isArray(invoices) && invoices.map((invoice: Invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
      <TimeSeriesGraph data={graphData} />
    </div>
  );
};

export default InvoicesPage;
