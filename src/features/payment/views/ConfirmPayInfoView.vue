<script setup>
import ConfirmPayInfo from '@/features/payment/components/ConfirmPayInfo.vue';
import PayInfo from '@/features/payment/components/PayInfo.vue';
import { useCartStore } from '@/stores/cart.js';
import { onMounted, ref } from 'vue';

const cartStore = useCartStore();
const orderItems = cartStore.selectedItems;

const priceDetails = ref([]);
onMounted(() => {
  const storedPriceDetails = sessionStorage.getItem('priceDetails');
  if (storedPriceDetails){
    priceDetails.value = JSON.parse(storedPriceDetails);
  }
});
</script>

<template>
  <div class="container">
    <div class="left">
      <!-- ConfirmPayInfo에 orderItems 전달 -->
      <ConfirmPayInfo :orderItems="orderItems"/>
    </div>
    <div class="right">
      <PayInfo :orderItems="orderItems" :priceDetails="priceDetails"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 3rem; /* 간격을 더 넓게 */
  padding: 2rem;
}

.left {
  width: 50rem;
  height: auto; /* 내용 생기면 아래로 자연스럽게 내려감 */
}

.right {
  width: 20rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgba(0,0,0,0.05);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 위-아래 정렬 */
}
</style>
