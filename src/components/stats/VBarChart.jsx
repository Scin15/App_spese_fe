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

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: true,
      text: 'Andamento spese mensili',
    },
  },
};

const VBarChart = ({ data }) => {

const dataChart = {
  labels: data.monthlyAmount.map(e => e.yearmonth),
  datasets: [
    {
      label: '',
      data: data.monthlyAmount.map(e => e.amount),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

  return <Bar options={options} data={dataChart} />;
}

export default VBarChart
