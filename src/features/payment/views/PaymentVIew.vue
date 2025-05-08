<script setup>

import { useCartStore } from '@/stores/cart.js';
import PaymentPage from '@/features/payment/components/PaymentPage.vue';

const cartStore = useCartStore();
const selectedItems = cartStore.selectedItems;
const paymentInfo = JSON.parse(sessionStorage.getItem('paymentInfo'))
</script>

<template>
  <div>
    <PaymentPage :selectedItems="selectedItems" :paymentInfo="paymentInfo"/>
  </div>
</template>

<style scoped>

</style>
