<script setup>
import { ref } from 'vue'
const page = ref(1)
</script>

<template>
  <div class="pagination">
    <button :disabled="page === 1" @click="page--">← 이전</button>
    <span class="current">{{ page }}</span>
    <button @click="page++">다음 →</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.pagination button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 8px;
  color: #333;
}

.pagination .current {
  font-weight: bold;
  border: 1px solid #ccc;
  padding: 4px 10px;
  border-radius: 6px;
  min-width: 30px;
  text-align: center;
}
</style>

