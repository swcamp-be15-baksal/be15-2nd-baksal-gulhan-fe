<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import { fetchMonthlyRevenue } from '@/features/dashboard/api/dashboard.js'
import { useAuthStore } from '@/stores/auth.js'

Chart.register(...registerables)

const chartRef = ref(null)
let chartInstance = null

const authStore = useAuthStore()
const accessToken = authStore.accessToken

const drawChart = (labels, data, tooltips) => {
  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: '월별 기념품 매출',
        data,
        backgroundColor: '#75A9FF',
      }],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              return tooltips[context.dataIndex]
            }
          }
        },
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

const fetchChartData = async () => {
  try {
    const res = await fetchMonthlyRevenue(accessToken)
    const items = res.monthlyRevenueList.filter(item => item.orderHistoryType === 'PACKAGE')

    const labels = items.map(item => parseInt(item.orderedAt.split('-')[1], 10) + '월')
    const data = items.map(item => item.totalPrice)
    const tooltips = items.map(item => `${item.totalQuantity}개 / ${item.totalPrice.toLocaleString()}원`)

    drawChart(labels, data, tooltips)
  } catch (err) {
    console.error('기념품 월별 수익 조회 실패:', err)
  }
}

onMounted(fetchChartData)
</script>

<template>
  <div class="chart-box">
    <h3>월별 패키지 주문 내역</h3>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-box {
  flex: 1;
  background-color: #f5f7f4;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.05);
}
h3 {
  margin-bottom: 12px;
  font-size: 1rem;
  font-weight: bold;
}
canvas {
  width: 100%;
  height: 300px;
}
</style>
