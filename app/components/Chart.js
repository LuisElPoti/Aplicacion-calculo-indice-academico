"use client"
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement } from 'chart.js'

Chart.register(ArcElement);

const labels = ['section 1', 'section 2'];

const data = {
  labels: labels,
  datasets: [{
    label: 'Doughnut chart',
    data: [20,30],
    backgroundColor: [
      'rgba(209, 118, 255)',
      'rgba(243, 246, 253)'
    ],
    borderColor: [
      'rgba(209, 118, 255)',
      'rgba(243, 246, 253)'
    ],
    borderWidth: 1,
    borderRadius: 10,
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
      <div className='titulo-grafico'>
        <p>Indice General de 4</p></div>
      <Doughnut
        data={data}
        options={{
          maintainAspectRatio: false,
          width: 300,
          height: 300,
        }}
      />
    </div>
  );
};

export default DoughnutChart;