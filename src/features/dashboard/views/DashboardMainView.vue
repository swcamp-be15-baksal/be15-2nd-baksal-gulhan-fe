<script setup>
import { useRouter } from 'vue-router'

// import DashboardDeliveryCard from '@/features/dashboard/components/DashboardDeliveryCard.vue'
import DashboardRefundInfo from '@/features/dashboard/components/DashboardRefundInfo.vue'

import MonthlyGoodsChart from '@/features/dashboard/components/chart/MonthlyGoodsChart.vue'
import MonthlyPackageChart from '@/features/dashboard/components/chart/MonthlyPackageChart.vue'
import DailyRevenueChart from '@/features/dashboard/components/chart/DailyRevenueChart.vue'
import DashboardNavButtons from '@/features/dashboard/components/DashboardNavButtons.vue';

const router = useRouter()

const goToOrder = () => router.push('/dashboard/order')
const goToShipping = () => router.push('/dashboard/shipping')
</script>

<template>
  <div class="dashboard-container">
    <!-- 상단 탭 버튼 -->
    <DashboardNavButtons />
<!--    <div class="top-buttons">-->
<!--      <button class="tab-btn" disabled>배송완료</button>-->
<!--      <button class="tab-btn" @click="goToOrder">주문수</button>-->
<!--      <button class="tab-btn" @click="goToShipping">운송장</button>-->
<!--    </div>-->

    <!-- 환불 정보  -->
    <DashboardRefundInfo />

    <!-- 월별 차트: 기념품 / 패키지 -->
    <div class="chart-section">
      <MonthlyPackageChart />
      <MonthlyGoodsChart />
    </div>

    <!-- 일별 수익 차트 -->
    <div class="daily-revenue-chart full-width">
      <DailyRevenueChart />
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  background-color: #fdfbf5;
  padding: 40px 60px;
}

.top-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.tab-btn {
  padding: 10px 18px;
  font-size: 0.9rem;
  border: none;
  background-color: #eee;
  border-radius: 8px;
  cursor: pointer;
}

.tab-btn:hover:not(:disabled) {
  background-color: #ccc;
}

.tab-btn:disabled {
  background-color: #ddd;
  cursor: default;
}

.chart-section {
  display: flex;
  gap: 20px;
  margin: 40px 0;
}

.full-width {
  grid-column: span 2;
}
</style>
