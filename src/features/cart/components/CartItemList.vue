<script setup>
import CartItem from '@/features/cart/components/CartItem.vue';

const { items } = defineProps({
  items: Array
});

const emit = defineEmits(['updateItemCount']);

function handleUpdateItemCount(id, count){
  emit('updateItemCount',id,count);

}
</script>

<template>
  <div class="cart-item-list">
    <CartItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      @updateItemCount="handleUpdateItemCount"
    />
  </div>

</template>

<style scoped>

</style>
