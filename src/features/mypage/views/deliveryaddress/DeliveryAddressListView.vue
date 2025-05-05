<script setup>
import router from '@/router/index.js';
import DeliveryAddressList from '@/features/mypage/components/DeliveryAddressList.vue';
</script>

<template>
  <div class="delivery-container">
    <h2 class="delivery-title">배송지 관리</h2>
    <div class="add-address">
      <p @click="router.push('/mypage/deliveryaddress/create')">
        배송지 추가
      </p>
    </div>
    <DeliveryAddressList />
  </div>
</template>

<style scoped>
.delivery-container {
  width: 100%;
  justify-items: center;
}
.delivery-title {
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}
.add-address {
  width: 670px;
  justify-items: flex-end;
}
.add-address p {
  color: #75A9FF;
  font-size: 1rem;
  cursor: pointer;
  justify-content: flex-end;
}
</style>
