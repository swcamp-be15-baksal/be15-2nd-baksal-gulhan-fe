<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'
import { fetchDailyRevenue } from '@/features/dashboard/api/dashboard.js'
import { useAuthStore } from '@/stores/auth.js'

Chart.register(...registerables)

const chartRef = ref(null)
let chartInstance = null

const authStore = useAuthStore()
const accessToken = authStore.accessToken

const drawChart = (labels, packageData, goodsData, tooltips) => {
  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: '패키지',
          data: packageData,
          backgroundColor: '#60a5fa',
          yAxisID: 'yPackage'
        },
        {
          label: '기념품',
          data: goodsData,
          backgroundColor: '#f87171',
          yAxisID: 'yGoods'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.dataset.label
              return `${label} - ${tooltips[label][context.dataIndex]}`
            }
          }
        },
        legend: {
          display: true,
          position: 'top'
        }
      },
      scales: {
        yPackage: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: '패키지 수익'
          },
          ticks: {
            callback: value => value.toLocaleString()
          },
          beginAtZero: true
        },
        yGoods: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: '기념품 수익'
          },
          grid: {
            drawOnChartArea: false
          },
          ticks: {
            callback: value => value.toLocaleString()
          },
          beginAtZero: true
        }
      }
    }
  })
}

const fetchChartData = async () => {
  try {
    const res = await fetchDailyRevenue({}, accessToken)
    const items = res.dailyRevenueList

    // 1. 오늘 기준으로 최근 7일 날짜 배열 만들기 (오름차순 X, 최신 → 과거 순)
    const today = new Date()
    const dates = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      dates.push(date.toISOString().split('T')[0]) // YYYY-MM-DD 형식
    }

    // 2. 날짜별 데이터 정리
    const grouped = {}
    items.forEach(item => {
      const date = item.orderedAt
      if (!grouped[date]) {
        grouped[date] = { GOODS: 0, PACKAGE: 0, tooltips: { GOODS: '', PACKAGE: '' } }
      }
      grouped[date][item.orderHistoryType] = item.totalPrice
      grouped[date].tooltips[item.orderHistoryType] = `${item.totalQuantity}개 / ${item.totalPrice.toLocaleString()}원`
    })

    // 3. 날짜 순서 유지한 상태로 차트용 데이터 생성
    const labels = dates
    const packageData = labels.map(date => grouped[date]?.PACKAGE || 0)
    const goodsData = labels.map(date => grouped[date]?.GOODS || 0)
    const tooltips = {
      PACKAGE: labels.map(date => grouped[date]?.tooltips.PACKAGE || '0개 / 0원'),
      GOODS: labels.map(date => grouped[date]?.tooltips.GOODS || '0개 / 0원')
    }

    drawChart(labels, packageData, goodsData, tooltips)
  } catch (err) {
    console.error('일별 수익 조회 실패:', err)
  }
}

onMounted(fetchChartData)
</script>


<template>
  <div class="chart-container">
    <h3 class="title">일별 수익</h3>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  background: #f5f7f4;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
