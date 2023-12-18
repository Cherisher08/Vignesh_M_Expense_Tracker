const xValues = ['August', 'September', 'October', 'November', 'December']
const yValues = [500, 680, 1200, 750, 1000]
const barColors = ['red', 'green', 'blue', 'orange', 'brown']

// eslint-disable-next-line no-undef
Chart.defaults.global.defaultFontColor = '#CCE0FF'
// eslint-disable-next-line no-undef
Chart.defaults.global.defaultFontSize = 15

// eslint-disable-next-line no-undef
export const myChart = new Chart('myChart', {
  type: 'bar',
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    responsive: false,
    legend: { display: false },
    title: {
      display: true,
      text: 'Expenses and Incomes in 2023'
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: true,
          color: '#FFFFFF'
        }
      }],
      xAxes: [{
        gridLines: {
          display: true,
          color: '#FFFFFF'
        }
      }]
    }
  }
})
