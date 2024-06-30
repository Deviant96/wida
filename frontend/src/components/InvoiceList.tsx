import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoices } from '../store/invoiceSlice';

const InvoiceList = () => {
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const invoices = useSelector((state: any) => state.invoices.invoices);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const status = useSelector((state: any) => state.invoices.status);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useSelector((state: any) => state.invoices.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getInvoices());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>{error}</div>;
  }

  return (
    <div>
      {invoices.map((invoice: any) => (
        <div key={invoice.id}>
          <h3>{invoice.customerName}</h3>
          <p>{invoice.salespersonName}</p>
          <p>{invoice.totalAmount}</p>
          <p>{invoice.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default InvoiceList;
