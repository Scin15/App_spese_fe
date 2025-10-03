import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const VBarChart = ({ data }) => {

const dataChart = {
  labels: data.monthlyAmount.map(e => e.yearmonth),
  datasets: [
    {
      label: 'Dataset 1',
      data: data.monthlyAmount.map(e => e.amount),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

  return <Bar options={options} data={dataChart} />;
}

export default VBarChart
