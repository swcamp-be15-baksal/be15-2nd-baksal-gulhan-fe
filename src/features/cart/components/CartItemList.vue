<script setup>
import { computed } from 'vue';
import CartItem from '@/features/cart/components/CartItem.vue';
import { useCartStore } from '@/stores/cart.js';

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cartItems)
</script>

<template>
  <div class="cart-item-list">
    <CartItem
      v-for="item in cartItems"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

<style scoped>
</style>
