<script setup>

import OrderHistory from '@/features/mypage/components/payment/OrderHistory.vue';
import MyPageHeader from '@/features/mypage/components/MyPageHeader.vue';
</script>

<template>
  <MyPageHeader />
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

</style>
