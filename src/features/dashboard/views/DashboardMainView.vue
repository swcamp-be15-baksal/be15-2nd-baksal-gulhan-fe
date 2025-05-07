<script setup>
import DashboardRefundInfo from '@/features/dashboard/components/DashboardRefundInfo.vue'
import MonthlyGoodsChart from '@/features/dashboard/components/chart/MonthlyGoodsChart.vue'
import MonthlyPackageChart from '@/features/dashboard/components/chart/MonthlyPackageChart.vue'
import DailyRevenueChart from '@/features/dashboard/components/chart/DailyRevenueChart.vue'
import DashboardNavButtons from '@/features/dashboard/components/DashboardNavButtons.vue';

</script>

<template>
  <div class="dashboard-container">
    <!-- 상단 탭 버튼 -->
    <DashboardNavButtons />

    <!-- 환불 정보  -->
    <DashboardRefundInfo />

    <!-- 월별 차트: 기념품 / 패키지 -->
    <div class="chart-section">
      <MonthlyPackageChart />
      <MonthlyGoodsChart />
    </div>

    <!-- 일별 수익 차트 -->
    <div class="daily-revenue-chart">
      <DailyRevenueChart />
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  background-color: #fdfbf5;
  padding: 40px 60px;
}

.chart-section {
  display: flex;
  gap: 20px;
  margin: 40px 0;
}

.daily-revenue-chart {
  grid-column: span 2;
}
</style>
