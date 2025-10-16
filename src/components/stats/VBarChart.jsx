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
      color: "#000000cb",
      font: {
        weight: "bold",
        size: 15
      }
    },
  },
};

const VBarChart = ({ data }) => {

  // riordino il dataset in base alle date
  data.monthlyAmount.sort((a, b) => {
      return new Date(a.yearmonth) - new Date(b.yearmonth)
    }
  )

const dataChart = {
  labels: data.monthlyAmount.map(e => e.yearmonth),
  datasets: [
    {
      label: '',
      data: data.monthlyAmount.map(e => e.amount),
      backgroundColor: 'rgba(72, 122, 189, 1)',
    },
  ],
};

  return <div className='md:mx-10'>
    <Bar options={options} data={dataChart} />
  </div> 
}

export default VBarChart
