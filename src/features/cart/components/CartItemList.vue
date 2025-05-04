<script setup>
import CartItem from '@/features/cart/components/CartItem.vue';

const { items } = defineProps({
  items: Array,
  selectedItemIds: Array
});

const emit = defineEmits(['updateItemCount','updateSelected']);

function handleUpdateItemCount(id, quantity){
  emit('updateItemCount',id,quantity);
}

function handleUpdateSelected(id){
  emit(`updateSelected`, id);
}
</script>

<template>
  <div class="cart-item-list">
    <CartItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :isSelected="selectedItemIds.includes(item.id)"
      @updateItemCount="handleUpdateItemCount"
      @updateSelected="handleUpdateSelected"
    />
  </div>

</template>

<style scoped>

</style>
