<template>
    <div>
      <div class="chart-container">
        <canvas ref="barChartCanvas"></canvas>
      </div>
      <div class="chart-container">
        <canvas ref="pieChartCanvas"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      const barChartCanvas = ref(null);
      const pieChartCanvas = ref(null);
      let barChartInstance = null;
      let pieChartInstance = null;
  
      // Create charts on component mount
      onMounted(() => {
        createCharts();
      });
  
      // Update charts when data changes
      watch(
        () => props.data,
        () => {
          updateCharts();
        }
      );
  
      // Create charts
      const createCharts = () => {
        const barCanvas = barChartCanvas.value;
        const barCtx = barCanvas.getContext('2d');
  
        const pieCanvas = pieChartCanvas.value;
        const pieCtx = pieCanvas.getContext('2d');
  
        // Create bar chart
        const groupedDataBar = {};
  
        props.data.forEach((polozka) => {
          if (!groupedDataBar[polozka.nazov]) {
            groupedDataBar[polozka.nazov] = polozka.cena;
          } else {
            groupedDataBar[polozka.nazov] += polozka.cena;
          }
        });
  
        const barLabels = Object.keys(groupedDataBar);
        const barData = Object.values(groupedDataBar);
  
        barChartInstance = new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: barLabels,
            datasets: [
              {
                label: 'Cena',
                data: barData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
  
        // Create pie chart
        const uniqueLabels = [];
        const groupedDataPie = {};
  
        props.data.forEach((polozka) => {
          if (!uniqueLabels.includes(polozka.kategoria)) {
            uniqueLabels.push(polozka.kategoria);
            groupedDataPie[polozka.kategoria] = polozka.cena;
          } else {
            groupedDataPie[polozka.kategoria] += polozka.cena;
          }
        });
  
        const pieLabels = Object.keys(groupedDataPie);
        const pieData = Object.values(groupedDataPie);
  
        pieChartInstance = new Chart(pieCtx, {
          type: 'pie',
          data: {
            labels: pieLabels,
            datasets: [
              {
                label: 'Cena',
                data: pieData,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      };
  
      // Update charts
      const updateCharts = () => {
        // Update bar chart
        const groupedDataBar = {};
  
        props.data.forEach((polozka) => {
          if (!groupedDataBar[polozka.nazov]) {
            groupedDataBar[polozka.nazov] = polozka.cena;
          } else {
            groupedDataBar[polozka.nazov] += polozka.cena;
          }
        });
  
        const barLabels = Object.keys(groupedDataBar);
        const barData = Object.values(groupedDataBar);
  
        barChartInstance.data.labels = barLabels;
        barChartInstance.data.datasets[0].data = barData;
        barChartInstance.update();
  
        // Update pie chart
        const uniqueLabels = [];
        const groupedDataPie = {};
  
        props.data.forEach((polozka) => {
          if (!uniqueLabels.includes(polozka.kategoria)) {
            uniqueLabels.push(polozka.kategoria);
            groupedDataPie[polozka.kategoria] = polozka.cena;
          } else {
            groupedDataPie[polozka.kategoria] += polozka.cena;
          }
        });
  
        const pieLabels = Object.keys(groupedDataPie);
        const pieData = Object.values(groupedDataPie);
  
        pieChartInstance.data.labels = pieLabels;
        pieChartInstance.data.datasets[0].data = pieData;
        pieChartInstance.update();
      };
  
      return {
        barChartCanvas,
        pieChartCanvas,
      };
    },
  };
  </script>
  
  <style>
  .chart-container {
    width: auto;
    height: 450px;
    margin-bottom: 20px;
  }
  </style>
  