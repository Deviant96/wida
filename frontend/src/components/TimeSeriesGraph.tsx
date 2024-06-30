import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { Invoice } from '../types';

interface TimeSeriesGraphProps {
  data: { date: string, revenue: number }[];
}

const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export const transformDataForGraph = (invoices: Invoice[], period: 'daily' | 'weekly' | 'monthly') => {
  const groupedData: { [key: string]: number } = {};

  invoices.forEach(invoice => {
    const date = new Date(invoice.date);
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    let key = '';

    switch (period) {
      case 'daily':
        key = date.toISOString().split('T')[0]; // YYYY-MM-DD
        break;
      case 'weekly':
        key = startOfWeek.toISOString().split('T')[0]; // YYYY-MM-DD
        break;
      case 'monthly':
        key = `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-MM
        break;
    }

    if (!groupedData[key]) {
      groupedData[key] = 0;
    }
    groupedData[key] += invoice.totalAmount;
  });

  return Object.keys(groupedData).map(date => ({ date, revenue: groupedData[date] }));
}

export default TimeSeriesGraph;
