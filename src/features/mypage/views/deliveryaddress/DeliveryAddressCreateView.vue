<script setup>

import DeliveryAddressForm from '@/features/mypage/components/form/delivery/DeliveryAddressForm.vue';
</script>

<template>
  <h2 class="title">배송지 등록</h2>
  <DeliveryAddressForm
    :initialData="null"
    submitLabel="등록"
    :disabled="false"
  />
</template>

<style scoped>
.title {
  font-size: 1.75rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
}
</style>
