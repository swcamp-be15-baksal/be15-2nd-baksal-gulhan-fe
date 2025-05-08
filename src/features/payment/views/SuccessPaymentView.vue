<script setup>
import SuccessPayment from '@/features/payment/components/SuccessPayment.vue'
const selectedItems = JSON.parse(sessionStorage.getItem('selectedItems'));
</script>

<template>
  <div>
    <SuccessPayment :selectedItems="selectedItems"/>
  </div>
</template>

<style scoped>

</style>
