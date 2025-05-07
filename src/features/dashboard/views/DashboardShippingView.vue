<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { fetchShippingOrders } from '@/features/dashboard/api/dashboard.js';
import ShippingOrderTable from '@/features/dashboard/components/order/ShippingOrderTable.vue';
import PaginationBar from '@/components/common/PaginationBar.vue';

const authStore = useAuthStore();
const accessToken = authStore.accessToken;

const orders = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 20;

const fetchData = async () => {
  try {
    const params = { page: currentPage.value, size: pageSize };
    const res = await fetchShippingOrders(params, accessToken);
    orders.value = res.orderAllList;
    totalPages.value = res.pagination.totalPage;
  } catch (err) {
    console.error('운송장 주문 조회 실패:', err);
  }
};

onMounted(fetchData);
</script>

<template>
  <div class="shipping-view">
    <h2 class="title">운송장 정보 조회</h2>
    <ShippingOrderTable :orders="orders" />
    <PaginationBar
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="(page) => { currentPage = page; fetchData(); }"
    />
  </div>
</template>

<style scoped>
.shipping-view {
  padding: 32px 60px;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
