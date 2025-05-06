<script setup>

import OrderHistory from '@/features/mypage/components/payment/OrderHistory.vue';
</script>

<template>
  <div class="purchase-list-view">
    <OrderHistory />
  </div>
</template>

<style scoped>
.purchase-list-view {
  padding: 2rem;
  max-width: 60rem;
  margin: 0 auto;
}
h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}
</style>
