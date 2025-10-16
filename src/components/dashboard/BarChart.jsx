import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
// Modify the axis by adding scales
  scales: {
    // to remove the labels
    x: {
        stacked: true,
        offset: true,
        border: {
          display: false
        },
        ticks: {
          display: false,
          beginAtZero: false,
        },

      // to remove the x-axis grid
      grid: {
        drawBorder: false,
        display: false,
        offset: false
      },
    },
    // to remove the y-axis labels
    y: {
      stacked: true,
      offset: true,
      border: {
        display: false,
      },
      ticks: {
        padding: 0,
        display: false,
        beginAtZero: false,
      },
      // to remove the y-axis grid
      grid: {
        drawBorder: false,
        display: false,
        offset:false
      },
    },
  },
  borderRadius: 10,
  borderWidth: 0.1,
  borderSkipped: 'middle',
  borderColor: '#010507ff',
  indexAxis: 'y',
  maxBarThickness: 20,
  clip:0

}

const labels = ['']

const BarChart = ({data})=> {
    const chartData = {
      labels,
      datasets: [
        {
            label: false,
            data: [data.total],
            backgroundColor: 'rgba(4, 201, 232, 0.91)',
        },
        {
            label: false,
            data: [data.budget - data.total],
            backgroundColor: 'rgba(184, 184, 184, 0.5)',
        },
      ],
    }
    
    return <Bar className="md:max-w-60 max-w-70 " options={options} data={chartData} />
}

export default BarChart
