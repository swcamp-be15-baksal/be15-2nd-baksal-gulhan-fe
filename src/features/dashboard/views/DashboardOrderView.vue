<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { fetchPackageOrders, fetchGoodsOrders } from '@/features/dashboard/api/dashboard'
import PackageOrderTable from '@/features/dashboard/components/order/PackageOrderTable.vue'
import GoodsOrderTable from '@/features/dashboard/components/order/GoodsOrderTable.vue'

const authStore = useAuthStore()
const accessToken = authStore.accessToken
const activeTab = ref('package')

const packageOrders = ref([])
const goodsOrders = ref([])

const fetchData = async () => {
  try {
    if (accessToken) {
      const [pkg, goods] = await Promise.all([
        fetchPackageOrders({}, accessToken),
        fetchGoodsOrders({}, accessToken)
      ])
      packageOrders.value = pkg.packageList
      goodsOrders.value = goods.goodsQuantityList
    }
  } catch (err) {
    console.error('데이터 조회 실패:', err)
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="dashboard-order-view">
    <h2 class="section-title">주문 수량 통계</h2>

    <div class="tab-buttons">
      <button :class="{ active: activeTab === 'package' }" @click="activeTab = 'package'">패키지</button>
      <button :class="{ active: activeTab === 'goods' }" @click="activeTab = 'goods'">기념품</button>
    </div>

    <PackageOrderTable v-if="activeTab === 'package'" :items="packageOrders" />
    <GoodsOrderTable v-else :items="goodsOrders" />
  </div>
</template>

<style scoped>
.dashboard-order-view {
  padding: 32px 60px;
  background: #fdfbf5;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.tab-buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.tab-buttons button {
  padding: 6px 18px;
  border-radius: 6px;
  border: none;
  background-color: #eee;
  color: #444;
  cursor: pointer;
  font-size: 0.9rem;
}

.tab-buttons button.active {
  background-color: #333;
  color: white;
}
</style>
