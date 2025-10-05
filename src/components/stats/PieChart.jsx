import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
      labels:{
        color: "#000000cb",
        font: {
          weight: "bold",
          size: 12
        }
      }
    },
    title: {
      display: true,
      text: 'Distribuzione spese per categoria',
      color: "#000000cb",
      font: {
        weight: "bold",
        size: 15
      }
    },
  },
};

const PieChart = ({ data })=> {
  
  const dataChart = {
    labels: data.categoryAmount.map(e => e.category),
    title: "Distribuzione spese per categoria",
    datasets: [
      {
        label: 'Distribuzione spese per categoria',
        data: data.categoryAmount.map(e => e.amount),
        backgroundColor: [
        'rgba(0, 83, 192, 1)',
        'rgba(72, 122, 189, 1)',
        'rgba(111, 145, 189, 1)',
        'rgba(130, 156, 190, 1)',
        'rgba(177, 184, 194, 1)'
      ],
      },
    ],
  };
  
  return <div className='mx-10'>
    <Doughnut data={dataChart} options={options} />
  </div> 

}

export default PieChart
