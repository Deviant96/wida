import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { fetchInvoices } from '../store/invoiceSlice';
import TimeSeriesGraph from '../components/TimeSeriesGraph';
import { useAppDispatch, useAppSelector } from '../hooks';
import InvoiceList from '../components/InvoiceList';
import { transformDataForGraph } from '../utils/dataTransform';

const InvoicesPage: React.FC = () => {
  const invoices = useAppSelector((state) => state.invoices.invoices);
  const dispatch = useAppDispatch();
  const invoiceStatus = useSelector((state: RootState) => state.invoices.status);
  const [graphData, setGraphData] = useState<{ date: string, revenue: number }[]>([]);
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

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

  const handlePeriodChange = (newPeriod: 'daily' | 'weekly' | 'monthly') => {
    setPeriod(newPeriod);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-screen-lg mx-auto p-4 bg-white shadow-md rounded-lg">
        <div className="mt-8">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => handlePeriodChange('daily')}
              className={`px-4 py-2 mx-2 ${period === 'daily' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
            >
              Daily
            </button>
            <button
              onClick={() => handlePeriodChange('weekly')}
              className={`px-4 py-2 mx-2 ${period === 'weekly' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
            >
              Weekly
            </button>
            <button
              onClick={() => handlePeriodChange('monthly')}
              className={`px-4 py-2 mx-2 ${period === 'monthly' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}
            >
              Monthly
            </button>
          </div>
          <TimeSeriesGraph data={graphData} period={period} />
        </div>
        <InvoiceList />
      </div>
    </div>
  );
};
export default InvoicesPage;
