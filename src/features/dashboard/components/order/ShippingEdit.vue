<script setup>
const emit = defineEmits(['click'])
</script>

<template>
  <button @click="emit('click')">
    <img src="@/assets/icons/edit.svg" alt="edit" width="18" />
  </button>
</template>

<style scoped>
button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
