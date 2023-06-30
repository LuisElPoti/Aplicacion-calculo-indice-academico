"use client"
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'

Chart.register(ArcElement);

const labels = ['section 1', 'section 2'];

const data = {
  labels: labels,
  datasets: [{
    label: 'Doughnut chart',
    data: [65, 20],
    backgroundColor: [
      'rgba(255, 99, 132)',
      'rgba(255, 159, 64)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)'
    ],
    borderWidth: 1,
    hoverBorderWidth: 4,
    hoverBorderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)'
    ],
  }]
};

const DoughnutChart = () => {
  return (
    <div className="chart">
      <h2>Indice General de 4</h2>
      <Doughnut
        data={data}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default DoughnutChart;