import React, { useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import mockInvoiceData from '../utils/mockInvoiceData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin
);

interface TimeSeriesGraphProps {
  data: { date: string; revenue: number }[];
  period: 'daily' | 'weekly' | 'monthly';
}

const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({ data, period }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = chartRef.current;

    if (chart) {
      chart.resetZoom();
    }
  }, [data]);

  const transformDataForPeriod = (data: { date: string; revenue: number }[]) => {
    console.log('data', data)
    const transformedData = data.map((item) => ({
      x: new Date(item.date),
      y: item.revenue,
    }));
    return transformedData;
  };

  const chartData = {
    datasets: [
      {
        label: 'Revenue',
        data: transformDataForPeriod(mockInvoiceData),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    adapters: {
      date: {
          locale: enUS
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: period === 'daily' ? 'day' : period === 'weekly' ? 'week' : 'month',
          tooltipFormat: 'PP',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Revenue (Rp)',
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
        pan: {
          enabled: true,
          mode: 'x',
        },
      },
    },
  };

  return (
    <div>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default TimeSeriesGraph;
